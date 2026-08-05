import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { togglePortfolioVisibility } from "@/lib/reports";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as { reportId?: string };
    if (!body.reportId) {
      return NextResponse.json({ error: "Missing reportId" }, { status: 400 });
    }

    const isPublic = await togglePortfolioVisibility(body.reportId, user.id);
    return NextResponse.json({ isPublic });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update portfolio visibility." },
      { status: 500 }
    );
  }
}
