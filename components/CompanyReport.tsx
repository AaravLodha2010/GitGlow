import Link from "next/link";
import CopyReportLink from "@/components/CopyReportLink";
import type { CompanyReport } from "@/lib/company-analysis";

function ProficiencyBadge({ proficiency }: { proficiency: string }) {
  const styles: Record<string, string> = {
    strong: "border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]",
    moderate: "border-zinc-700 bg-zinc-800 text-zinc-300",
    weak: "border-zinc-700 bg-zinc-800 text-zinc-300",
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[proficiency] ?? styles.moderate}`}>
      {proficiency}
    </span>
  );
}

function FitBadge({ fit }: { fit: string }) {
  const styles: Record<string, string> = {
    high: "border-[#d7ff54]/20 bg-[#d7ff54]/10 text-[#d7ff54]",
    medium: "border-zinc-700 bg-zinc-800 text-zinc-300",
    low: "border-zinc-700 bg-zinc-800 text-zinc-300",
  };

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[fit] ?? styles.low}`}>
      {fit}
    </span>
  );
}

export default function CompanyReport({ report }: { report: CompanyReport }) {
  const { analysis } = report;
  const generatedDate = new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(report.createdAt));

  return (
    <section className="mx-auto w-full max-w-3xl animate-fade-in-up">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#101012]/90 shadow-[0_30px_90px_rgba(0,0,0,0.4)] before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-500 before:to-transparent transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90">
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/30 px-4 py-3 text-xs sm:px-8">
          <span className="font-medium text-zinc-400">Company readiness</span>
          <span className="hidden items-center gap-1.5 text-zinc-500 sm:inline-flex">
            <span className="size-1.5 rounded-full bg-[#d7ff54] shadow-[0_0_8px#d7ff54]" />Public report
          </span>
        </div>
        <div className="p-5 sm:p-8">
          <div className="flex flex-col justify-between gap-5 border-b border-zinc-800 pb-6 sm:gap-7 sm:pb-8 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Company readiness · @{report.username}</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-zinc-100 sm:text-3xl break-words">{report.company}</h1>
              <p className="mt-1.5 text-xs text-zinc-500 sm:text-sm">Generated {generatedDate}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid size-[3.5rem] place-items-center rounded-full p-1 shadow-[0_0_28px_rgba(215,255,84,0.15)] sm:size-[4.5rem]" style={{ background: `conic-gradient(#d7ff54 0deg ${analysis.score * 3.6}deg, #27272a ${analysis.score * 3.6}deg 360deg)` }}>
                <div className="grid size-full place-items-center rounded-full bg-[#101012]">
                  <span className="text-lg font-semibold tracking-[-0.06em] text-[#d7ff54] sm:text-xl">{analysis.score}</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 sm:text-xs">Out of</p>
                <p className="mt-1 text-sm font-medium text-zinc-300">100 points</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-8 pt-6 sm:mt-8 sm:gap-10 sm:pt-8 sm:grid-cols-2 sm:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#d7ff54]">What stands out</p>
              <h2 className="mt-2 text-lg font-semibold tracking-[-0.03em] text-zinc-100">Strengths</h2>
              <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
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
              <ul className="mt-4 space-y-3 sm:mt-5 sm:space-y-3.5">
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

          {analysis.relevantSkills.length > 0 && (
            <div className="mt-7 border-t border-zinc-800 pt-6 sm:mt-9 sm:pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Relevant skills</p>
              <p className="mt-2 text-xs text-zinc-600">Skills from your portfolio that match what this company looks for.</p>
              <div className="mt-3 sm:mt-4 -mx-5 sm:mx-0 overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-zinc-900/50 text-xs uppercase tracking-[0.08em] text-zinc-500">
                      <tr>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Skill</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Proficiency</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Evidence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {analysis.relevantSkills.map((skill: { skill: string; proficiency: string; evidence: string }) => (
                        <tr key={skill.skill} className="bg-[#111113] transition-colors duration-200 hover:bg-zinc-900/60">
                          <td className="px-4 py-3 font-medium text-zinc-200">{skill.skill}</td>
                          <td className="px-4 py-3"><ProficiencyBadge proficiency={skill.proficiency} /></td>
                          <td className="px-4 py-3 text-zinc-400">{skill.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {analysis.missingSkills.length > 0 && (
            <div className="mt-7 border-t border-zinc-800 pt-6 sm:mt-9 sm:pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Missing skills</p>
              <p className="mt-2 text-xs text-zinc-600">Skills commonly expected for this company that are not clearly shown in your portfolio.</p>
              <ul className="mt-3 space-y-2 sm:mt-4">
                {analysis.missingSkills.map((skill: string) => (
                  <li key={skill} className="flex items-start gap-3 text-sm leading-5 text-zinc-400">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-zinc-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.projectFit.length > 0 && (
            <div className="mt-7 border-t border-zinc-800 pt-6 sm:mt-9 sm:pt-7">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">Project fit</p>
              <p className="mt-2 text-xs text-zinc-600">How well your projects align with what this company typically values.</p>
              <div className="mt-3 sm:mt-4 -mx-5 sm:mx-0 overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-zinc-900/50 text-xs uppercase tracking-[0.08em] text-zinc-500">
                      <tr>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Project</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Fit</th>
                        <th className="px-4 py-3 font-medium whitespace-nowrap">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {analysis.projectFit.map((item: { project: string; fit: string; reason: string }) => (
                        <tr key={item.project} className="bg-[#111113] transition-colors duration-200 hover:bg-zinc-900/60">
                          <td className="px-4 py-3 font-medium text-zinc-200">{item.project}</td>
                          <td className="px-4 py-3"><FitBadge fit={item.fit} /></td>
                          <td className="px-4 py-3 text-zinc-400">{item.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row">
        <Link href="/company-readiness" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-[#d7ff54]">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true"><path d="M16 10H4M9 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Analyze another company
        </Link>
        <CopyReportLink reportId={report.id} />
      </div>
    </section>
  );
}
