import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "./page";

vi.mock("@/lib/api", () => ({
  API_BASE_URL: "http://localhost:8000",
  fetchHealth: vi.fn().mockResolvedValue({
    status: "ok",
    service: "Personal Finance API",
    version: "0.1.0",
    environment: "development",
  }),
}));

describe("Home page", () => {
  it("renders the hero and backend status card", async () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Your money, clearly." }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Backend online")).toBeInTheDocument();
  });
});
