"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return <button className="text-sm font-medium text-zinc-500 transition hover:text-zinc-200" onClick={signOut} type="button">Sign out</button>;
}
