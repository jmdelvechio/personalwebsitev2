import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();
  if (!name || !email || !message)
    return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });

  const { error } = await supabaseAdmin().from("contacts").insert({ name, email, subject, message });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const { data, error } = await supabaseAdmin()
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
