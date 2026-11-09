# Personal Finance

A starter full-stack workspace for a personal finance application:

- **`backend/`** — Python 3.12+ API built with FastAPI and managed by [uv](https://docs.astral.sh/uv/)
- **`frontend/`** — Next.js 16 (React 19 + TypeScript) app using the App Router
- **`docker-compose.yml`** — optional container setup for running both services together

## Project structure

```text
.
├── backend/
│   ├── app/
│   │   ├── api/routes/        # Health and example transaction routes
│   │   ├── core/              # Settings and configuration
│   │   ├── schemas/           # Pydantic request/response models
│   │   ├── services/          # In-memory example store
│   │   └── main.py            # FastAPI application
│   ├── tests/                 # pytest suite
│   ├── Dockerfile
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── app/               # App Router pages and styles
│   │   ├── components/        # Reusable UI components
│   │   ├── lib/               # API client helpers
│   │   └── test/              # Vitest setup
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Prerequisites

- Python 3.12+
- [uv](https://docs.astral.sh/uv/getting-started/installation/)
- Node.js 20.9+ (Node 24 recommended)
- Docker + Docker Compose (optional)

## Quick start

### 1. Backend

```bash
cd backend
cp .env.example .env
uv sync
uv run uvicorn app.main:app --reload
```

The API is served at <http://localhost:8000>:

- Interactive docs: <http://localhost:8000/docs>
- Health check: <http://localhost:8000/api/v1/health>
- Example resource: <http://localhost:8000/api/v1/transactions>

### 2. Frontend

In a second terminal:

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>. The home page calls the backend health endpoint and reports
whether the API is reachable.

## Common commands

| Location    | Command                 | Purpose                     |
| ----------- | ----------------------- | --------------------------- |
| `backend/`  | `uv run pytest`         | Run the backend test suite  |
| `backend/`  | `uv run ruff check .`   | Lint the backend            |
| `backend/`  | `uv run ruff format .`  | Format the backend          |
| `frontend/` | `npm test`              | Run frontend unit tests     |
| `frontend/` | `npm run lint`          | Lint the frontend           |
| `frontend/` | `npm run typecheck`     | Type-check the frontend     |
| `frontend/` | `npm run build`         | Create a production build   |
| `frontend/` | `npm run format`        | Format with Prettier        |

## Running with Docker Compose

```bash
docker compose up --build
```

- Frontend: <http://localhost:3000>
- Backend: <http://localhost:8000/docs>

`NEXT_PUBLIC_API_URL` is baked into the frontend bundle at build time, so rebuild the frontend
image whenever you change it. Adjust the build arg in `docker-compose.yml` if your API is hosted
somewhere other than `http://localhost:8000`.

## Configuration

Backend settings use the `APP_` prefix and can be set via environment variables or `backend/.env`:

| Variable            | Default                   | Description                          |
| ------------------- | ------------------------- | ------------------------------------ |
| `APP_ENVIRONMENT`   | `development`             | Environment name reported by the API |
| `APP_CORS_ORIGINS`  | `["http://localhost:3000"]` | JSON array of allowed origins        |
| `APP_API_V1_PREFIX` | `/api/v1`                 | Prefix for versioned routes          |

Frontend settings live in `frontend/.env.local`:

| Variable              | Default                 | Description                    |
| --------------------- | ----------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Base URL of the FastAPI server |

## Next steps

- Replace the in-memory transaction store in `backend/app/services/transactions.py` with a
  database-backed repository.
- Add authentication, migrations, and domain-specific routes.
- Expand the frontend with data fetching and forms once the API shape settles.
