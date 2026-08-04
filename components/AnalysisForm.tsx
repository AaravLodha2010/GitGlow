"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const loadingMessages = [
  "Analyzing repositories...",
  "Reviewing README files...",
  "Evaluating documentation...",
  "Calculating portfolio score...",
];

export default function AnalysisForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const messageTimer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % loadingMessages.length);
    }, 500);
    const redirectTimer = window.setTimeout(() => router.push("/analysis"), 2000);

    return () => {
      window.clearInterval(messageTimer);
      window.clearTimeout(redirectTimer);
    };
  }, [isLoading, router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.trim()) {
      setError("Enter a GitHub username to continue.");
      return;
    }

    setError("");
    setMessageIndex(0);
    setIsLoading(true);
  }

  if (isLoading) {
    return (
      <div className="text-center" role="status" aria-live="polite">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-[#d7ff54]/20 bg-[#d7ff54]/10">
          <span className="size-5 animate-spin rounded-full border-2 border-[#d7ff54]/25 border-t-[#d7ff54]" />
        </div>
        <p className="mt-7 text-lg font-medium tracking-[-0.02em] text-zinc-100">{loadingMessages[messageIndex]}</p>
        <p className="mt-2 text-sm text-zinc-500">This will only take a moment.</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="github-username">GitHub username</label>
        <input
          className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-[#d7ff54]/70 focus:ring-4 focus:ring-[#d7ff54]/10"
          id="github-username"
          name="github-username"
          placeholder="octocat"
          value={username}
          onChange={(event) => { setUsername(event.target.value); setError(""); }}
          aria-describedby={error ? "username-error" : undefined}
          aria-invalid={Boolean(error)}
        />
        {error && <p className="mt-2 text-sm text-rose-400" id="username-error">{error}</p>}
      </div>
      <button className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d7ff54] px-5 text-sm font-semibold text-zinc-950 transition hover:bg-[#e0ff7b] hover:shadow-[0_10px_30px_rgba(215,255,84,0.17)]" type="submit">
        Analyze Portfolio
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </form>
  );
}
