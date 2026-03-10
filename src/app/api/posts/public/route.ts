import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseAdmin()
    .from("posts")
    .select("id, title, slug, excerpt, cover_url, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
