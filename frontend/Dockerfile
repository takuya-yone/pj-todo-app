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
COPY --from=builder  /app/frontend/out/ /usr/share/nginx/html
EXPOSE 80

###################################

# CMD ["node", "frontend/server.js"]