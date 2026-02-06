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
NestJS module-based architecture:
- **AppModule** — Root module, enables CORS
- **TodoModule** — CRUD endpoints for todo items (`/api/todo`)
- **AuthModule** — JWT authentication via AWS Cognito + Passport
- **HealthModule** — Health check endpoint
- **PrismaService** — Wraps Prisma client with multi-adapter support (PostgreSQL, MariaDB, TiDB)

Swagger UI served at `/api/docs`. The OpenAPI spec is auto-written to `openapi.yml` on startup, which the frontend consumes for code generation.

### Frontend (`packages/frontend/`)
- **Orval** generates type-safe SWR hooks and Zod schemas from the backend's `openapi.yml` into `app/gen/`
- Custom hook `app/hooks/useTodo.ts` wraps generated endpoints for CRUD operations
- UI built with shadcn/ui components (`app/components/ui/`) and TailwindCSS 4
- Path alias: `@/*` maps to `app/`

### Data Flow
Frontend → (SWR generated hooks) → Backend REST API → Prisma → PostgreSQL

When backend API changes: restart backend to regenerate `openapi.yml`, then run `yarn workspace frontend orval` to update generated types.

### Database Schema (Prisma)
- `TodoItem` — id (CUID), title, comment, complete, timestamps
- `TodoItemMetadata` — priority, dueDate, linked to TodoItem (cascade delete)
- Schema at `packages/backend/prisma/schema.prisma`, Prisma client output at `packages/backend/generated/prisma/`

## Code Style
- **Biome** for linting and formatting (not ESLint/Prettier)
- 2-space indentation, 100 char line width
- Single quotes, no semicolons, trailing commas
- `noUnusedVariables: error`, `noExplicitAny: off`
- Tests use `.spec.ts` suffix with Vitest (`describe`/`it`/`expect`)

## Environment Setup
Both packages have `.env.example` files. Copy them to `.env` before running:
```sh
cp packages/backend/.env.example packages/backend/.env
cp packages/frontend/.env.example packages/frontend/.env
```

## CI
GitHub Actions runs on push to main and PRs: builds both packages, generates Prisma client for backend. See `.github/workflows/ci.yml`.
