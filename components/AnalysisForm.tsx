"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const loadingMessages = [
  "Analyzing repositories...",
  "Reviewing README files...",
  "Evaluating documentation...",
  "Calculating portfolio score...",
];

export default function AnalysisForm({ username }: { username: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const messageTimer = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % loadingMessages.length);
    }, 500);

    return () => window.clearInterval(messageTimer);
  }, [isLoading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessageIndex(0);
    setIsLoading(true);

    const startedAt = Date.now();
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      const payload = (await response.json()) as {
        error?: string;
        reportId?: string;
      };

      if (!response.ok || !payload.reportId) {
        throw new Error(payload.error ?? "Unable to analyze this GitHub profile.");
      }

      const remainingDelay = Math.max(0, 2000 - (Date.now() - startedAt));
      if (remainingDelay) {
        await new Promise((resolve) => window.setTimeout(resolve, remainingDelay));
      }

      router.push(`/analysis/${payload.reportId}`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to analyze this GitHub profile.");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="py-10 text-center" role="status" aria-live="polite">
        <div className="relative mx-auto grid size-12 place-items-center">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-[#d7ff54]/20 border-t-[#d7ff54]" />
          <svg viewBox="0 0 24 24" className="size-4 text-[#d7ff54]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7 3v12a4 4 0 0 0 8 0V7M7 7h8" strokeLinecap="round" /></svg>
        </div>
        <p className="mt-6 text-lg font-medium tracking-[-0.02em] text-zinc-100">{loadingMessages[messageIndex]}</p>
        <p className="mt-2 text-sm text-zinc-500">This usually takes a few seconds.</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="github-username">GitHub username</label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-zinc-500">@</span>
          <input className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-8 pr-4 text-sm text-zinc-200 outline-none" id="github-username" name="github-username" value={username} readOnly aria-describedby={error ? "username-error" : undefined} aria-invalid={Boolean(error)} />
        </div>
        {error && <p className="mt-2 text-sm text-rose-400" id="username-error">{error}</p>}
      </div>
      <button className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d7ff54] px-5 text-sm font-semibold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_30px_rgba(215,255,84,0.17)]" type="submit">Analyze Portfolio<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
    </form>
  );
}
