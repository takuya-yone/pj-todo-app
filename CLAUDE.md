# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Full-stack Todo application monorepo using Yarn 4 workspaces. Backend is NestJS with Prisma ORM (PostgreSQL), frontend is Next.js 16 with React 19. Node 24 required (see `.node-version`).

## Commands

### Install dependencies
```sh
corepack enable && yarn install
```

### Backend
```sh
yarn workspace backend start:dev          # Dev server with watch (port 4000)
yarn workspace backend build              # Production build
yarn workspace backend test               # Run tests (Vitest)
yarn workspace backend test:watch         # Tests in watch mode
yarn workspace backend test:cov           # Tests with coverage
yarn workspace backend prisma generate    # Generate Prisma client (required before build)
yarn workspace backend prisma migrate dev # Create/apply migrations
```

Run a single test file from the backend directory:
```sh
vitest run src/todo/todo.controller.spec.ts
```

### Frontend
```sh
yarn workspace frontend dev     # Dev server
yarn workspace frontend build   # Static export build
yarn workspace frontend lint    # Next.js lint
yarn workspace frontend orval   # Generate API types from backend OpenAPI spec
```

### Linting & Formatting (Biome)
```sh
yarn fix:all        # Lint + format both packages
yarn fix:frontend   # Frontend only
yarn fix:backend    # Backend only
```

### Docker
```sh
docker compose up   # Runs app (port 4000) + PostgreSQL (port 5432)
```

## Architecture

### Monorepo Structure
- `packages/backend/` — NestJS API server
- `packages/frontend/` — Next.js static frontend

### Backend (`packages/backend/`)
NestJS module-based architecture with global prefix `/api`:
- **AppModule** — Root module. Configures CORS, global `ValidationPipe` (transform enabled), `LoggerMiddleware`, and serves frontend static build via `ServeStaticModule`.
- **TodoModule** — CRUD endpoints at `/api/todo`. All endpoints use request body (not URL params), including DELETE.
- **AuthModule** — JWT authentication via AWS Cognito + Passport (`passport-jwt` with JWKS). Guard name: `jwtCognito`.
- **HealthModule** — Health check endpoint at `/api/health`.
- **PrismaService** — Singleton Prisma client with lifecycle hooks and multi-adapter support (PostgreSQL, MariaDB, TiDB) via `src/prisma/adapters.ts`.

Swagger UI served at `/api/docs`. The OpenAPI spec is auto-written to `openapi.yml` on startup, which the frontend consumes for code generation.

Backend tests require a running PostgreSQL database — they use real PrismaService instances, not mocks.

### Frontend (`packages/frontend/`)
- **Orval** generates type-safe SWR hooks and Zod schemas from the backend's `openapi.yml` into `app/gen/`
- Custom hook `app/hooks/useTodo.ts` wraps generated endpoints for CRUD operations
- UI built with shadcn/ui components (`app/components/ui/`) and TailwindCSS 4
- Static export mode — no server-side features (no API routes, no SSR)
- UI text is in Japanese (locale: `ja`)
- Path alias: `@/*` maps to `app/`

### Data Flow
Frontend → (SWR generated hooks) → Backend REST API → Prisma → PostgreSQL

When backend API changes: restart backend to regenerate `openapi.yml`, then run `yarn workspace frontend orval` to update generated types.

### Auto-Generated Files (Do Not Edit)
- `packages/backend/generated/prisma/` — Prisma client (regenerate with `yarn workspace backend prisma generate`)
- `packages/frontend/app/gen/` — Orval API types and hooks (regenerate with `yarn workspace frontend orval`)

### Database Schema (Prisma)
Schema at `packages/backend/prisma/schema.prisma`. Models use `@@map` for table names:
- `TodoItem` → `todo` table (CUID primary key, title, comment, complete, timestamps)
- `TodoItemMetadata` → `todo_metadata` table (priority, dueDate, cascade delete from TodoItem)
- `HealthMessage` → `health` table

Seed script: `prisma/seed.ts`.

## Code Style
- **Biome** for linting and formatting (not ESLint/Prettier)
- Biome auto-organizes imports on fix
- 2-space indentation, 100 char line width
- Single quotes, no semicolons, trailing commas
- `noUnusedVariables: error`, `noExplicitAny: off`
- Tests use `.spec.ts` suffix with Vitest (`describe`/`it`/`expect`)
- DTOs use `class-validator` decorators for validation and `class-transformer` for serialization

## Environment Setup
Both packages have `.env.example` files. Copy them to `.env` before running:
```sh
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env
```

Docker Compose provides PostgreSQL on port 5432 with default credentials `postgres/postgres`.

## CI
GitHub Actions runs on push to main and PRs: builds both packages, generates Prisma client for backend. See `.github/workflows/ci.yml`.
