import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { email, name, source } = await req.json();
  if (!email) return NextResponse.json({ error: "Email obrigatório" }, { status: 400 });

  const { error } = await supabaseAdmin().from("leads").upsert(
    { email, name, source: source ?? "newsletter" },
    { onConflict: "email" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const { data, error } = await supabaseAdmin()
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
