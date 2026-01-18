FROM node:25-alpine AS base

# build nextjs
FROM base AS app-builder
ENV NODE_ENV=production
RUN corepack enable npm yarn pnpm
COPY . /app
WORKDIR /app
RUN yarn workspaces focus frontend backend
RUN yarn workspace backend prisma generate
RUN yarn workspace backend build
RUN yarn workspace frontend build

# install dependencies
FROM base AS deps-installer
ENV NODE_ENV=production
RUN corepack enable npm yarn pnpm
COPY . /app
WORKDIR /app
RUN yarn workspaces focus backend

############### App ###############

FROM base AS runner
ENV NODE_ENV=production
RUN corepack enable npm yarn pnpm
WORKDIR /app
COPY --from=app-builder /app/packages/frontend/out ./packages/frontend/out
COPY --from=app-builder /app/packages/backend/dist ./packages/backend/dist
COPY --from=app-builder /app/packages/backend/prisma ./prisma
COPY --from=app-builder /app/packages/backend/package.json ./package.json
# COPY --from=app-builder /app/packages/backend/env.ts ./env.ts
COPY --from=app-builder /app/packages/backend/prisma.config.ts ./prisma.config.ts
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