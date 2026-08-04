import Link from "next/link";
import GitHubAuthButton from "@/components/GitHubAuthButton";
import Navbar from "@/components/Navbar";
import PageAtmosphere from "@/components/PageAtmosphere";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#09090b] text-zinc-50"><PageAtmosphere /><Navbar /><section className="relative flex flex-1 items-center justify-center px-6 py-20"><div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#101012]/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:p-8"><p className="text-sm font-medium text-[#d7ff54]">Welcome to GitGlow</p><h1 className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-zinc-100">Connect your GitHub portfolio.</h1><p className="mt-3 text-sm leading-6 text-zinc-400">Sign in securely to analyze your public repositories, save reports, and track your progress.</p><div className="mt-8"><GitHubAuthButton /></div>{error && <p className="mt-4 text-center text-sm text-rose-400">GitHub sign-in could not be completed. Please try again.</p>}<p className="mt-5 text-center text-xs leading-5 text-zinc-600">GitGlow only analyzes your public GitHub portfolio.</p><Link href="/" className="mt-6 block text-center text-sm text-zinc-500 transition hover:text-zinc-200">Back to home</Link></div></section></main>;
}
