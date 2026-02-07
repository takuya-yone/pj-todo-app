# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the monorepo root unless noted. From this directory, use `yarn` directly instead of `yarn workspace backend`.

```sh
yarn start:dev              # Dev server with --watch and .env loaded (port 4000)
yarn build                  # Production build (nest build → dist/)
yarn test                   # Run tests (Vitest)
yarn test:watch             # Tests in watch mode
yarn test:cov               # Tests with coverage (vitest --coverage)
vitest run src/todo         # Run tests for a single module
vitest run src/todo/todo.controller.spec.ts  # Run a single test file
yarn prisma generate        # Generate Prisma client (required before build)
yarn prisma migrate dev     # Create/apply migrations
```

Lint and format from monorepo root:
```sh
yarn fix:backend            # Biome lint + format
```

## Architecture

NestJS application with global prefix `/api`. All routes are under `/api/*`.

### Module Structure

- **AppModule** (`src/app.module.ts`) — Root module. Configures CORS, global `ValidationPipe` with `transform: true`, `LoggerMiddleware` on all routes, and serves the frontend static build from `frontend/out` via `ServeStaticModule`.
- **TodoModule** (`src/todo/`) — CRUD at `/api/todo`. All endpoints use request body (not URL params) for input, including DELETE.
- **AuthModule** (`src/auth/`) — JWT auth via AWS Cognito. Uses `passport-jwt` with JWKS validation. Guard name: `jwtCognito`.
- **HealthModule** (`src/health/`) — Health checks at `/api/health`. Includes a DB deep check and a JWT-protected endpoint.
- **PrismaService** (`src/prisma/prisma.service.ts`) — Singleton Prisma client with `OnModuleInit`/`OnModuleDestroy` lifecycle. Supports multiple database adapters via `src/prisma/adapters.ts` (PostgreSQL default, MariaDB, TiDB).

### Key Patterns

- **DTOs** use `class-validator` decorators for validation and `class-transformer` for serialization. Each module has a `*.dto.ts` file.
- **Swagger/OpenAPI** is configured in `src/main.ts`. On startup, the spec is written to `openapi.yml` at the project root — the frontend consumes this for code generation.
- **Configuration** is centralized in `src/config/configuration.ts` with typed access via `ConfigService`. Cognito and DB settings are validated here.
- **Tests** require a running PostgreSQL database — they use real PrismaService instances, not mocks. The Vitest config loads `.env` for DB connection.

### Database

Schema at `prisma/schema.prisma`. Generated client output at `generated/prisma/` (CommonJS format, configured in `prisma.config.ts`).

Models use `@@map` to set table names:
- `TodoItem` → `todo` table (CUID primary key)
- `TodoItemMetadata` → `todo_metadata` table (cascade delete from TodoItem)
- `HealthMessage` → `health` table

Seed script: `prisma/seed.ts` (run via `tsx`).

## Environment

Copy `.env.example` to `.env`. Required variables: `DB_USERNAME`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_SCHEMA`, `DB_SSLMODE`, plus Cognito settings (`COGNITO_CLIENT_ID`, `COGNITO_REGION`, `COGNITO_USERPOOL_ID`).

Docker Compose from repo root provides PostgreSQL on port 5432 with default credentials `postgres/postgres`.
