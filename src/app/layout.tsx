import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIFA Heroes Leaderboard",
  description: "Live leaderboard for FIFA Heroes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
