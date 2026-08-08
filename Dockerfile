# syntax=docker/dockerfile:1

FROM node:24-alpine AS base
# node:24-alpine は corepack を同梱していないため明示的に導入する。
# pnpm 自体のバージョンは package.json の packageManager フィールドから解決される。
RUN npm install -g corepack && corepack enable pnpm
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

############### Dependencies ###############

# 依存解決に必要なマニフェストだけを先に COPY する。
# ソースを変更しても install レイヤーのキャッシュが壊れないようにするのが目的。
# (以前は `COPY . /app` が install の前にあったため、1 行の変更で毎回フルインストールしていた)
FROM base AS manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/backend/package.json ./packages/backend/
COPY packages/frontend/package.json ./packages/frontend/

# ビルド用: nest/next CLI 等の devDependencies が必要なので --prod=false を明示する
FROM manifests AS build-deps
RUN pnpm install --frozen-lockfile --prod=false --filter frontend --filter backend

# 実行用: runner の prisma migrate deploy が prisma.config.ts 経由で dotenv を読むため
# devDependencies も含めてインストールする (yarn workspaces focus と同じ挙動)
FROM manifests AS runtime-deps
RUN pnpm install --frozen-lockfile --prod=false --filter backend

############### Build ###############

# backend と frontend は互いに独立しているため別ステージに分けている。
# こうすると BuildKit が 2 つを並列にビルドする。
FROM build-deps AS backend-builder
COPY packages/backend ./packages/backend
# prisma generate は datasource URL に接続しないが、prisma.config.ts が env() を
# 即時解決するためダミー値を渡す。これにより .env (gitignore 対象) が
# ビルドコンテキストに無くてもイメージをビルドできる
RUN DB_USERNAME=build DB_PASSWORD=build DB_HOST=localhost DB_PORT=5432 \
    DB_DATABASE=build DB_SSLMODE=disable \
    pnpm --filter backend exec prisma generate
RUN pnpm --filter backend run build

FROM build-deps AS frontend-builder
COPY packages/frontend ./packages/frontend
RUN pnpm --filter frontend run build

############### App ###############

FROM base AS runner
WORKDIR /app
COPY --from=frontend-builder /app/packages/frontend/out ./packages/frontend/out
COPY --from=backend-builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=backend-builder /app/packages/backend/prisma ./prisma
COPY --from=backend-builder /app/packages/backend/package.json ./package.json
COPY --from=backend-builder /app/packages/backend/prisma.config.ts ./prisma.config.ts
# nodeLinker: hoisted (pnpm-workspace.yaml) によりフラットな node_modules が
# ワークスペースルートに生成されるため、そのままコピーできる
COPY --from=runtime-deps /app/node_modules ./node_modules

ENTRYPOINT ["node", "packages/backend/dist/src/main.js"]

EXPOSE 4000

############### Smoke test ###############

# runner ステージは pnpm の hoisted な node_modules を COPY して組み立てているため、
# ビルド成功だけでなくイメージ内で実際に解決できるかまで確認する。
# CI から `--target smoke-test` でビルドする。RUN の中で検証が完結するので
# イメージを docker daemon に load する必要がなく、export のコストがかからない。
FROM runner AS smoke-test
RUN set -e; \
    test -f packages/backend/dist/src/main.js; \
    test -f packages/frontend/out/index.html; \
    DB_USERNAME=ci DB_PASSWORD=ci DB_HOST=localhost DB_PORT=5432 \
    DB_DATABASE=ci DB_SSLMODE=disable \
    ./node_modules/.bin/prisma -v
