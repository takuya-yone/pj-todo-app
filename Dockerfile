FROM node:20-alpine AS base

# build nextjs
FROM base AS app-builder
ENV NODE_ENV=production
RUN corepack enable npm yarn pnpm
COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn workspace backend prisma generate
RUN yarn workspace backend build
RUN yarn workspace frontend build

# build nextjs
FROM base AS deps-installer
ENV NODE_ENV=production
RUN corepack enable npm yarn pnpm
COPY . /app
WORKDIR /app
RUN yarn workspaces focus backend
RUN yarn workspace backend prisma generate

############### Nginx ###############

FROM base AS runner
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.1 /lambda-adapter /opt/extensions/lambda-adapter
ENV NODE_ENV=production 
COPY --from=app-builder /app/frontend/out ./frontend/out
COPY --from=app-builder /app/backend/dist ./backend/dist
COPY --from=deps-installer /app/node_modules ./node_modules
COPY --from=app-builder /app/backend/prisma ./backend/prisma
# COPY --from=builder /app/backend/.env ./.env


# WORKDIR /backend
CMD ["node", "backend/dist/main.js"]

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