# 外部イメージをbaseステージとして扱う
FROM node:26-alpine AS base

# baseステージをもとにbuilderステージを開始
FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

ENV NODE_ENV=production 

RUN npm install -g corepack && corepack enable pnpm

RUN pnpm install --frozen-lockfile --prod=false

COPY . .


RUN pnpm --filter backend run build
RUN pnpm --filter backend exec prisma generate
# RUN pnpm --filter backend exec prisma migrate deploy

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