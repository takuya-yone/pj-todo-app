# 外部イメージをbaseステージとして扱う
FROM node:20-alpine AS base

# baseステージをもとにbuilderステージを開始
FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable npm yarn pnpm

RUN yarn install

COPY . .


RUN yarn workspace backend build
RUN yarn workspace backend prisma:local generate
RUN yarn workspace backend prisma:local migrate deploy
# baseステージをもとにrunnerステージを開始
FROM base AS runner

WORKDIR /app

COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules




CMD ["node", "dist/main.js"]