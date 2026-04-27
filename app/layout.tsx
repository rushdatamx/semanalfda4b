import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4BUDDIES × FDA — Salud del Negocio YTD 2026",
  description: "Presentación ejecutiva YTD 2026 — 4BUDDIES en Farmacias del Ahorro",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
