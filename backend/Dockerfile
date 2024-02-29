# 外部イメージをbaseステージとして扱う
FROM node:20-alpine AS base

# baseステージをもとにbuilderステージを開始
FROM base AS builder

WORKDIR /app

COPY package.json yarn.lock ./

ENV NODE_ENV=production 

RUN corepack enable npm yarn pnpm

RUN yarn install

COPY . .


RUN yarn workspace backend build
RUN yarn workspace backend prisma:local generate
# RUN yarn workspace backend prisma:local migrate deploy

FROM base AS runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /app

ENV NODE_ENV=production 

COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma
# COPY --from=builder /app/backend/.env ./.env
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 4000

CMD ["node", "dist/main.js"]