# 外部イメージをbaseステージとして扱う
FROM node:20-alpine AS base

# baseステージをもとにbuilderステージを開始
FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable npm yarn pnpm

RUN yarn install

COPY . .

RUN yarn workspace backend prisma generate
RUN yarn workspace frontend build

# baseステージをもとにrunnerステージを開始
FROM base AS runner

WORKDIR /app

# public と .next/static は nextjs の standalone を使う場合に含まれないため、コピーする必要がある
# https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
# builderから必要なファイルだけコピーする
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/.next/static ./.next/static

COPY --from=builder /app/frontend/.next/standalone ./

# `next start` の代わりに `node server.js` を使用
# https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
CMD ["node", "frontend/server.js"]