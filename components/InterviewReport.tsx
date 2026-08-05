import Link from "next/link";
import CopyReportLink from "@/components/CopyReportLink";
import { DifficultyBadge, TypeBadge } from "./InterviewBadges";
import type { InterviewReport } from "@/lib/reports";

export default function InterviewReport({ report }: { report: InterviewReport }) {
  const { analysis } = report;
  const generatedDate = new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt));

  const questionsByType = analysis.questions.reduce<Record<string, typeof analysis.questions>>((acc, question) => {
    const type = question.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(question);
    return acc;
  }, {});

  const typeLabels: Record<string, string> = {
    technical: "Technical",
    behavioral: "Behavioral",
    system_design: "System Design",
    project: "Project",
  };

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#101012]/90 shadow-[0_30px_90px_rgba(0,0,0,0.4)] before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-500 before:to-transparent">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 px-6 py-3 text-xs sm:px-8">
          <span className="font-medium text-zinc-400">GitGlow interview preparation</span>
          <span className="inline-flex items-center gap-1.5 text-zinc-500">
            <span className="size-1.5 rounded-full bg-[#d7ff54] shadow-[0_0_8px_#d7ff54]" />Public report
          </span>
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-7 border-b border-zinc-800 pb-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">Interview prep · @{report.username}</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.055em] text-zinc-100">Interview readiness</h1>
              <p className="mt-2 text-sm text-zinc-500">Generated {generatedDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-[4.5rem] place-items-center rounded-full p-1 shadow-[0_0_28px_rgba(215,255,84,0.15)]" style={{ background: `conic-gradient(#d7ff54 0deg ${analysis.score * 3.6}deg, #27272a ${analysis.score * 3.6}deg 360deg)` }}>
                <div className="grid size-full place-items-center rounded-full bg-[#101012]">
                  <span className="text-xl font-semibold tracking-[-0.06em] text-[#d7ff54]">{analysis.score}</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Out of</p>
                <p className="mt-1 text-sm font-medium text-zinc-300">100 points</p>
              </div>
            </div>
          </div>

          <div className="grid gap-10 pt-8 sm:grid-cols-2 sm:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">What stands out</p>
              <h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-zinc-100">Strengths</h2>
              <ul className="mt-5 space-y-3.5">
                {analysis.strengths.map((item: string) => (
                  <li className="flex items-start gap-3 text-sm leading-5 text-zinc-300" key={item}>
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3" aria-hidden="true"><path d="M5 10l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">What to improve</p>
              <h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-zinc-100">Recommendations</h2>
              <ul className="mt-5 space-y-3.5">
                {analysis.recommendations.map((item: string) => (
                  <li className="flex items-start gap-3 text-sm leading-5 text-zinc-300" key={item}>
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300">
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-3" aria-hidden="true"><path d="M10 5v5l3 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {analysis.focusAreas.length > 0 && (
            <div className="mt-9 border-t border-zinc-800 pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Focus areas</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.focusAreas.map((area: string) => (
                  <span key={area} className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {Object.keys(questionsByType).length > 0 && (
            <div className="mt-9 border-t border-zinc-800 pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Interview questions</p>
              <div className="mt-4 space-y-6">
                {Object.entries(questionsByType).map(([type, questions]) => (
                  <div key={type}>
                    <h3 className="text-sm font-semibold text-zinc-200">{typeLabels[type] ?? type}</h3>
                    <ul className="mt-3 space-y-3">
                      {questions.map((question, index: number) => (
                        <li key={index} className="rounded-xl border border-zinc-800 bg-[#111113] p-4">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-medium text-zinc-100">{question.question}</p>
                            <div className="flex items-center gap-2">
                              <DifficultyBadge difficulty={question.difficulty} />
                              <TypeBadge type={question.type} />
                            </div>
                          </div>
                          <p className="mt-2 text-xs text-zinc-500">Hint: {question.hint}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href="/interview-prep" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition hover:text-[#d7ff54]">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M16 10H4M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Generate new questions
        </Link>
        <CopyReportLink reportId={report.id} />
      </div>
    </section>
  );
}
