import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { fetchHealth } from "@/lib/api";

import { HealthCheck } from "./health-check";

vi.mock("@/lib/api", () => ({
  fetchHealth: vi.fn(),
}));

const mockedFetchHealth = vi.mocked(fetchHealth);

describe("HealthCheck", () => {
  beforeEach(() => {
    mockedFetchHealth.mockReset();
  });

  it("shows the backend details when the API is reachable", async () => {
    mockedFetchHealth.mockResolvedValue({
      status: "ok",
      service: "Personal Finance API",
      version: "0.1.0",
      environment: "development",
    });

    render(<HealthCheck />);

    expect(await screen.findByText("Backend online")).toBeInTheDocument();
    expect(screen.getByText("Personal Finance API v0.1.0 · development")).toBeInTheDocument();
  });

  it("shows an error when the API is unreachable", async () => {
    mockedFetchHealth.mockRejectedValue(new Error("connection refused"));

    render(<HealthCheck />);

    expect(await screen.findByText("Backend unreachable")).toBeInTheDocument();
  });
});
