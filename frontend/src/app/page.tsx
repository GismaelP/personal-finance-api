import { HealthCheck } from "@/components/health-check";
import { API_BASE_URL } from "@/lib/api";

import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <span className={styles.badge}>Personal Finance</span>
        <h1 className={styles.title}>Your money, clearly.</h1>
        <p className={styles.lead}>
          A starter full-stack workspace with a FastAPI backend and a Next.js frontend. Replace the
          example transaction resource with your own domain and start building.
        </p>
      </header>

      <section className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Backend status</h2>
          <HealthCheck />
          <a className={styles.link} href={`${API_BASE_URL}/docs`} target="_blank" rel="noreferrer">
            Open the API docs →
          </a>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Getting started</h2>
          <ol className={styles.steps}>
            <li>
              Run <code>uv run uvicorn app.main:app --reload</code> in <code>backend/</code>.
            </li>
            <li>
              Run <code>npm run dev</code> in <code>frontend/</code>.
            </li>
            <li>
              Read <code>README.md</code> at the repository root for the full setup.
            </li>
          </ol>
        </div>
      </section>

      <footer className={styles.footer}>
        API base URL: <code>{API_BASE_URL}</code>
      </footer>
    </main>
  );
}
