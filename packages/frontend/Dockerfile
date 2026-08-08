# 外部イメージをbaseステージとして扱う
FROM node:24-alpine AS base

# baseステージをもとにbuilderステージを開始
FROM base AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN npm install -g corepack && corepack enable pnpm

RUN pnpm install --frozen-lockfile --prod=false

COPY . .

RUN pnpm --filter backend exec prisma generate
RUN pnpm --filter frontend run build


# COPY --from=builder /app/frontend/next.config.mjs ./
# COPY --from=builder /app/frontend/public ./public
# COPY --from=builder /app/frontend/.next/standalone ./
# COPY --from=builder /app/frontend/.next/static ./.next/static

# COPY --from=builder /app/frontend/out/ ./.next/static

############### Nginx ###############

FROM nginx:1.23.1-alpine
COPY ./frontend/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY ./frontend/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=builder  /app/frontend/out/ /usr/share/nginx/html
ENV PORT 8080
EXPOSE 8080

###################################

# CMD ["node", "frontend/server.js"]