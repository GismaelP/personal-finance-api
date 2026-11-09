# Backend

FastAPI service for the personal finance app, managed with [uv](https://docs.astral.sh/uv/).

## Setup

```bash
cp .env.example .env
uv sync
uv run uvicorn app.main:app --reload
```

The API runs at <http://localhost:8000> with interactive docs at `/docs`.

## Layout

```text
app/
├── api/
│   ├── router.py          # Aggregates versioned routers
│   └── routes/            # health.py, transactions.py
├── core/config.py         # Pydantic settings (APP_* env vars)
├── schemas/               # Pydantic models
├── services/              # Example in-memory transaction store
└── main.py                # FastAPI app, CORS, router registration
```

## Endpoints

| Method | Path                     | Description                    |
| ------ | ------------------------ | ------------------------------ |
| GET    | `/`                      | Service metadata               |
| GET    | `/api/v1/health`         | Health and environment details |
| GET    | `/api/v1/transactions`   | List example transactions      |
| POST   | `/api/v1/transactions`   | Create an example transaction  |

The transaction resource is intentionally backed by an in-memory store so the starter runs
without external services. Replace `app/services/transactions.py` with a real repository.

## Commands

```bash
uv run pytest            # tests
uv run ruff check .      # lint
uv run ruff format .     # format
uv run ruff format --check .
```

## Configuration

Settings are read from environment variables with the `APP_` prefix, or from `.env`:

| Variable            | Default                     | Description                   |
| ------------------- | --------------------------- | ----------------------------- |
| `APP_ENVIRONMENT`   | `development`               | Environment label             |
| `APP_CORS_ORIGINS`  | `["http://localhost:3000"]` | JSON array of allowed origins |
| `APP_API_V1_PREFIX` | `/api/v1`                   | Versioned route prefix        |

## Docker

```bash
docker build -t personal-finance-backend .
docker run --rm -p 8000:8000 personal-finance-backend
```
