FROM node:24-alpine AS base
# node:24-alpine は corepack を同梱していないため明示的に導入する。
# pnpm 自体のバージョンは package.json の packageManager フィールドから解決される。
RUN npm install -g corepack && corepack enable pnpm

# build nextjs
FROM base AS app-builder
ENV NODE_ENV=production
COPY . /app
WORKDIR /app
# ビルドには devDependencies (nest/next CLI 等) が必要なので --prod=false を明示する
RUN pnpm install --frozen-lockfile --prod=false --filter frontend --filter backend
# prisma generate は datasource URL に接続しないが、prisma.config.ts が env() を
# 即時解決するためダミー値を渡す。これにより .env (gitignore 対象) が
# ビルドコンテキストに無くてもイメージをビルドできる
RUN DB_USERNAME=build DB_PASSWORD=build DB_HOST=localhost DB_PORT=5432 \
    DB_DATABASE=build DB_SSLMODE=disable \
    pnpm --filter backend exec prisma generate
RUN pnpm --filter backend run build
RUN pnpm --filter frontend run build

# install dependencies
FROM base AS deps-installer
ENV NODE_ENV=production
COPY . /app
WORKDIR /app
# runner の prisma migrate deploy が prisma.config.ts 経由で dotenv を読むため
# devDependencies も含めてインストールする (yarn workspaces focus と同じ挙動)
RUN pnpm install --frozen-lockfile --prod=false --filter backend

############### App ###############

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=app-builder /app/packages/frontend/out ./packages/frontend/out
COPY --from=app-builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=app-builder /app/packages/backend/prisma ./prisma
COPY --from=app-builder /app/packages/backend/package.json ./package.json
# COPY --from=app-builder /app/packages/backend/env.ts ./env.ts
COPY --from=app-builder /app/packages/backend/prisma.config.ts ./prisma.config.ts
# nodeLinker: hoisted (pnpm-workspace.yaml) によりフラットな node_modules が
# ワークスペースルートに生成されるため、そのままコピーできる
COPY --from=deps-installer /app/node_modules ./node_modules

# WORKDIR /backend
ENTRYPOINT ["node", "packages/backend/dist/src/main.js"]

EXPOSE 4000



# FROM nginx:1.23.1-alpine
# COPY ./frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY ./frontend/nginx/nginx.conf /etc/nginx/nginx.conf
# COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter
# COPY --from=builder  /app/frontend/out/ /usr/share/nginx/html
# ENV PORT 8080
# EXPOSE 8080

###################################

# CMD ["node", "frontend/server.js"]
