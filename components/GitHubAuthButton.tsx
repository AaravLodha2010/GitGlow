"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function GitHubAuthButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function signIn() {
    setIsLoading(true);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
    });
    if (error) {
      setIsLoading(false);
      router.push("/auth/login?error=github");
    }
  }

  return <button className={`inline-flex items-center justify-center gap-2 font-semibold transition ${compact ? "rounded-full bg-zinc-100 px-4 py-2.5 text-xs text-zinc-950 hover:bg-[#d7ff54] sm:px-5 sm:text-sm" : "h-12 w-full rounded-xl bg-[#d7ff54] px-5 text-sm text-zinc-950 hover:bg-[#e0ff7b]"}`} disabled={isLoading} onClick={signIn} type="button"><svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .08 1.54 1.06 1.54 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.11 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0112 5.8c.85 0 1.7.12 2.5.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.43.2 2.49.1 2.75.64.73 1.03 1.65 1.03 2.78 0 3.97-2.34 4.84-4.57 5.1.36.32.68.93.68 1.87 0 1.35-.01 2.44-.01 2.77 0 .27.18.59.69.49A10.24 10.24 0 0022 12.23C22 6.58 17.52 2 12 2z" /></svg>{isLoading ? "Opening GitHub..." : "Continue with GitHub"}</button>;
}
