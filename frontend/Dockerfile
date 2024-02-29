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