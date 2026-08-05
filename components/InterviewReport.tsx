"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { InterviewReport } from "@/lib/reports";

function FlashcardStudy({ questions }: { questions: InterviewReport["analysis"]["questions"] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const current = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const goPrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const typeLabels: Record<string, string> = {
    technical: "Technical",
    behavioral: "Behavioral",
    system_design: "System Design",
    project: "Project",
  };

  const difficultyStyles: Record<string, string> = {
    easy: "border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]",
    medium: "border-zinc-700 bg-zinc-800 text-zinc-300",
    hard: "border-zinc-700 bg-zinc-800 text-zinc-300",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex w-full max-w-2xl items-center justify-between sm:mb-6">
        <span className="text-xs text-zinc-500">
          Card {currentIndex + 1} of {questions.length}
        </span>
        <span className="text-xs font-medium text-zinc-400">
          {typeLabels[current.type] ?? current.type}
        </span>
      </div>

      <div className="mb-4 h-1.5 w-full max-w-2xl overflow-hidden rounded-full bg-zinc-800 sm:mb-6">
        <div
          className="h-full rounded-full bg-[#d7ff54] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        onClick={() => setIsFlipped((prev) => !prev)}
        className="w-full max-w-2xl"
      >
        {!isFlipped ? (
          <div className="rounded-2xl border border-zinc-800 bg-[#111113] p-6 shadow-lg sm:p-8 transition-all duration-200 hover:border-zinc-700">
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-medium text-zinc-100 leading-relaxed sm:text-lg">{current.question}</p>
              <div className="flex shrink-0 items-center gap-2">
                <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium sm:px-2.5 sm:py-0.5 ${difficultyStyles[current.difficulty] ?? difficultyStyles.medium}`}>
                  {current.difficulty}
                </span>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500 sm:mt-5">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden="true"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Tap to reveal answer</span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#d7ff54]/20 bg-[#111113] p-6 shadow-lg sm:p-8 transition-all duration-200 hover:border-zinc-700">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">Answer</p>
            <p className="mt-2 text-xs leading-5 text-zinc-500">Hint: {current.hint}</p>
            <div className="mt-3 h-px bg-zinc-800 sm:mt-4" />
            <p className="mt-3 text-sm leading-6 text-zinc-300 sm:mt-4 sm:leading-7">{current.preparation}</p>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500 sm:mt-5">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3.5" aria-hidden="true"><path d="M9 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 12h10" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>Tap to flip back</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex w-full max-w-2xl items-center justify-between gap-3 sm:mt-8 sm:gap-4">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900/90 disabled:opacity-40 sm:gap-2 sm:px-5 sm:py-2.5"
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M16 10H4M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="hidden sm:inline">Previous</span>
        </button>

        <button
          onClick={() => { setIsFlipped(false); setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1)); }}
          disabled={currentIndex === questions.length - 1}
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3.5 py-2 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:border-zinc-700 hover:bg-zinc-900/90 disabled:opacity-40 sm:gap-2 sm:px-5 sm:py-2.5"
        >
          <span className="hidden sm:inline">Next</span>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {currentIndex === questions.length - 1 && (
        <p className="mt-3 text-xs text-zinc-600 sm:mt-4">You reached the last card</p>
      )}
    </div>
  );
}

export default function InterviewReport({ report }: { report: InterviewReport }) {
  const analysis = report.analysis;

  const questions = useMemo(() => analysis.questions, [analysis.questions]);

  const questionsByType = questions.reduce<Record<string, InterviewReport["analysis"]["questions"]>>((acc, question) => {
    const type = question.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(question);
    return acc;
  }, {} as Record<string, InterviewReport["analysis"]["questions"]>);

  const typeLabels: Record<string, string> = {
    technical: "Technical",
    behavioral: "Behavioral",
    system_design: "System Design",
    project: "Project",
  };

  return (
    <section className="mx-auto w-full max-w-3xl animate-fade-in-up">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#101012]/90 shadow-[0_30px_90px_rgba(0,0,0,0.4)] before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-500 before:to-transparent transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 px-4 py-3 text-xs sm:px-8">
          <span className="font-medium text-zinc-400">Interview preparation</span>
          <span className="hidden items-center gap-1.5 text-zinc-500 sm:inline-flex">
            <span className="size-1.5 rounded-full bg-[#d7ff54] shadow-[0_0_8px#d7ff54]" />Public report
          </span>
        </div>
        <div className="p-5 sm:p-8">
          <div className="flex flex-col justify-between gap-5 border-b border-zinc-800 pb-6 sm:gap-7 sm:pb-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Interview prep · @{report.username}</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl">Interview readiness</h1>
              <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">Generated {new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt))}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-[3.5rem] place-items-center rounded-full p-1 shadow-[0_0_28px_rgba(215,255,84,0.15)] sm:size-[4.5rem]" style={{ background: `conic-gradient(#d7ff54 0deg ${report.analysis.score * 3.6}deg, #27272a ${report.analysis.score * 3.6}deg 360deg)` }}>
                <div className="grid size-full place-items-center rounded-full bg-[#101012]">
                  <span className="text-lg font-semibold tracking-[-0.06em] text-[#d7ff54] sm:text-xl">{report.analysis.score}</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:text-xs">Out of</p>
                <p className="mt-1 text-sm font-medium text-zinc-300">100 points</p>
              </div>
            </div>
          </div>

          <div className="mt-7 border-t border-zinc-800 pt-6 sm:mt-9 sm:pt-7">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Flashcard study</p>
            <p className="mt-1 text-xs text-zinc-600">Study your interview questions one at a time. Tap to reveal the answer.</p>

            <div className="mt-5 sm:mt-6">
              {Object.keys(questionsByType).map((type, index) => (
                <div key={type} className={index > 0 ? "mt-6 pt-6 border-t border-zinc-800 sm:mt-8 sm:pt-8" : ""}>
                  <h3 className="text-sm font-semibold text-zinc-200 mb-3 sm:mb-4">{typeLabels[type] ?? type}</h3>
                  <FlashcardStudy questions={questionsByType[type]} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row">
        <Link href="/interview-prep" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-[#d7ff54]">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M16 10H4M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Generate new questions
        </Link>
      </div>
    </section>
  );
}
