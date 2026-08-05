import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitGlow — Your GitHub, at its best",
  description: "AI-powered software engineering coach that helps developers build recruiter-ready GitHub portfolios.",
  keywords: ["GitHub", "portfolio", "developer", "internship", "AI", "career", "resume"],
  authors: [{ name: "Aarav Lodha" }],
  openGraph: {
    title: "GitGlow — Your GitHub, at its best",
    description: "Turn your GitHub into your strongest resume with AI-powered portfolio analysis.",
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
