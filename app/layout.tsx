import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitGlow — Your GitHub, at its best",
  description: "Turn your GitHub into your strongest resume.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
