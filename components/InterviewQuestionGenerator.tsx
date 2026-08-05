"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const loadingMessages = [
  "Analyzing your portfolio...",
  "Generating technical questions...",
  "Preparing behavioral scenarios...",
  "Finalizing interview prep...",
];

export default function InterviewQuestionGenerator() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const timer = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % loadingMessages.length);
    }, 800);

    return () => window.clearInterval(timer);
  }, [isLoading]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError("");

      setIsLoading(true);
      setMessageIndex(0);

      const startedAt = Date.now();
      try {
        const response = await fetch("/api/interview/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        const payload = (await response.json()) as { error?: string; reportId?: string };

        if (!response.ok || !payload.reportId) {
          throw new Error(payload.error ?? "Unable to generate interview questions.");
        }

        const remainingDelay = Math.max(0, 1500 - (Date.now() - startedAt));
        if (remainingDelay) {
          await new Promise((resolve) => window.setTimeout(resolve, remainingDelay));
        }

        router.push(`/interview-prep/${payload.reportId}`);
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "Unable to generate interview questions.");
        setIsLoading(false);
      }
    },
    [router],
  );

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
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <p className="text-sm leading-6 text-zinc-400">
          We will analyze your GitHub portfolio and generate personalized interview questions based on your projects, skills, and experience.
        </p>
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <button
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#d7ff54] px-5 text-sm font-semibold text-zinc-950 transition duration-300 hover:-translate-y-0.5 hover:bg-[#e0ff7b] hover:shadow-[0_10px_30px_rgba(215,255,84,0.17)]"
        type="submit"
      >
        Generate interview questions
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </form>
  );
}
