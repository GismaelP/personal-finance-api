import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Finance",
  description: "A FastAPI + Next.js starter for a personal finance app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
