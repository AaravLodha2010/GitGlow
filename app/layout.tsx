import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitGlow — Your GitHub, at its best",
  description: "Review your GitHub portfolio with clear feedback and actionable improvements.",
  keywords: ["GitHub", "portfolio", "developer", "internship", "career", "resume"],
  authors: [{ name: "Aarav Lodha" }],
  openGraph: {
    title: "GitGlow — Your GitHub, at its best",
    description: "Get a clear review of your public GitHub profile with specific, actionable feedback.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
