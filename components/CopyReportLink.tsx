"use client";

import { useState } from "react";

export default function CopyReportLink({ reportId }: { reportId: string }) {
  const [label, setLabel] = useState("Copy report link");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/analysis/${reportId}`);
      setLabel("Link copied");
    } catch {
      setLabel("Copy failed");
    }

    window.setTimeout(() => setLabel("Copy report link"), 2000);
  }

  return <button className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100" onClick={copyLink} type="button"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-4" aria-hidden="true"><rect x="7" y="7" width="9" height="9" rx="1.5" /><path d="M4 13V5.5A1.5 1.5 0 015.5 4H13" /></svg>{label}</button>;
}
