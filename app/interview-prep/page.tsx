import InterviewQuestionGenerator from "@/components/InterviewQuestionGenerator";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";
import CursorGlow from "@/components/CursorGlow";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Interview prep — GitGlow",
  description: "Get interview questions based on your GitHub projects, skills, and experience.",
};

export default async function InterviewPrepPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const username = typeof user.user_metadata.user_name === "string" ? user.user_metadata.user_name : null;
  if (!username) redirect("/auth/login?error=github");

  return (
    <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#09090b] text-zinc-50">
      <PageAtmosphere />
      <CursorGlow />
      <Navbar />
      <section className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute size-[30rem] rounded-full bg-[#d7ff54]/[0.07] blur-[120px]" />
        <div className="relative w-full max-w-md">
          <div className="mb-5 flex items-center justify-center gap-2 text-xs font-medium text-zinc-500">
            <span className="size-1.5 rounded-full bg-[#d7ff54]" />
            Connected GitHub account · Public data only
          </div>
          <div className="relative rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)] before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-zinc-600 before:to-transparent sm:p-8">
            <p className="text-sm font-medium text-[#d7ff54]">Interview preparation</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100">Practice interview questions</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              We will analyze your GitHub portfolio and generate personalized interview questions based on your projects, skills, and experience.
            </p>
            <div className="mt-8">
              <InterviewQuestionGenerator />
            </div>
            <p className="mt-5 text-center text-xs leading-5 text-zinc-600">
              Questions are generated from your public GitHub profile and repositories only.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
