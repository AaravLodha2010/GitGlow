"use client";

import { useState } from "react";

function Flashcard({ question, type, difficulty, hint, preparation }: {
  question: string;
  type: string;
  difficulty: string;
  hint: string;
  preparation: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const difficultyStyles: Record<string, string> = {
    easy: "border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]",
    medium: "border-zinc-700 bg-zinc-800 text-zinc-300",
    hard: "border-zinc-700 bg-zinc-800 text-zinc-300",
  };

  const typeLabels: Record<string, string> = {
    technical: "Technical",
    behavioral: "Behavioral",
    system_design: "System Design",
    project: "Project",
  };

  return (
    <div
      className="relative rounded-xl border border-zinc-800 bg-[#111113] shadow-sm transition-all duration-300 hover:border-zinc-700"
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div className={`transition-opacity duration-300 ${isFlipped ? "opacity-0" : "opacity-100"}`}>
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base font-medium text-zinc-100 leading-relaxed">{question}</p>
            <div className="flex shrink-0 items-center gap-2">
              <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyStyles[difficulty] ?? difficultyStyles.medium}`}>
                {difficulty}
              </span>
              <span className="inline-flex rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                {typeLabels[type] ?? type}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden="true"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Tap to reveal answer</span>
          </div>
        </div>
      </div>

      <div className={`absolute inset-0 transition-opacity duration-300 ${isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="h-full overflow-y-auto rounded-xl border border-[#d7ff54]/20 bg-[#111113] p-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">Answer</p>
          <p className="mt-2 text-xs leading-5 text-zinc-500">Hint: {hint}</p>
          <div className="mt-4 h-px bg-zinc-800" />
          <p className="mt-4 text-sm leading-7 text-zinc-300">{preparation}</p>
          <div className="mt-5 flex items-center gap-1.5 text-xs text-zinc-500">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden="true"><path d="M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12h10" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Tap to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
