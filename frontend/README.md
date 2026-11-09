# Frontend

Next.js 16 (React 19 + TypeScript, App Router) frontend for the personal finance app.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>. The home page calls the FastAPI health endpoint through
`src/lib/api.ts` and displays the connection status.

## Scripts

| Command                | Description                     |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Start the development server    |
| `npm run build`        | Create a production build       |
| `npm run start`        | Serve the production build      |
| `npm run lint`         | Run ESLint                      |
| `npm run typecheck`    | Run TypeScript without emitting |
| `npm test`             | Run Vitest once                 |
| `npm run test:watch`   | Run Vitest in watch mode        |
| `npm run format`       | Format files with Prettier      |
| `npm run format:check` | Check formatting                |

## Layout

```text
src/
├── app/                   # App Router pages, layout, and global styles
├── components/            # HealthCheck component and its tests
├── lib/api.ts             # API base URL and health fetch helper
└── test/setup.ts          # Testing Library / jest-dom setup
```

## Environment

| Variable              | Default                 | Description                    |
| --------------------- | ----------------------- | ------------------------------ |
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Base URL of the FastAPI server |

`NEXT_PUBLIC_*` variables are inlined at build time. Set the value before running
`npm run build` (and rebuild the Docker image if you change it).

## Docker

```bash
docker build -t personal-finance-frontend .
docker run --rm -p 3000:3000 personal-finance-frontend
```
