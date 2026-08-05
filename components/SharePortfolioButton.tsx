"use client";

import { useState } from "react";

function SharePortfolioButton({ reportId, isPublic, username }: { reportId: string; isPublic: boolean; username: string }) {
  const [loading, setLoading] = useState(false);
  const [currentState, setCurrentState] = useState(isPublic);
  const [copied, setCopied] = useState(false);

  const toggle = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/portfolio/toggle-visibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId }),
      });
      const payload = (await response.json()) as { isPublic?: boolean; error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to update visibility.");
      }
      setCurrentState(payload.isPublic ?? !currentState);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    const url = `${window.location.origin}/portfolio/${username}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggle}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
          currentState
            ? "border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]"
            : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
        } disabled:opacity-50`}
      >
        {currentState ? "Public" : "Private"}
      </button>
      {currentState && (
        <button
          onClick={copyLink}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-zinc-700"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      )}
    </div>
  );
}

export default SharePortfolioButton;
