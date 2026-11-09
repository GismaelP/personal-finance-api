"use client";

import { useEffect, useState } from "react";

import { fetchHealth } from "@/lib/api";

import styles from "./health-check.module.css";

type Status = "loading" | "ok" | "error";

const labels: Record<Status, string> = {
  loading: "Checking backend…",
  ok: "Backend online",
  error: "Backend unreachable",
};

export function HealthCheck() {
  const [status, setStatus] = useState<Status>("loading");
  const [detail, setDetail] = useState("Waiting for a response from the API.");

  useEffect(() => {
    const controller = new AbortController();

    fetchHealth(controller.signal)
      .then((health) => {
        setStatus("ok");
        setDetail(`${health.service} v${health.version} · ${health.environment}`);
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setStatus("error");
        setDetail("Start the backend on http://localhost:8000 and try again.");
      });

    return () => controller.abort();
  }, []);

  return (
    <div className={styles.status}>
      <span className={styles.dot} data-status={status} aria-hidden="true" />
      <div>
        <p className={styles.label}>{labels[status]}</p>
        <p className={styles.detail}>{detail}</p>
      </div>
    </div>
  );
}
