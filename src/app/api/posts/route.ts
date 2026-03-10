import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const adminPass = req.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD;

  console.log("[admin-debug] received:", JSON.stringify(adminPass));
  console.log("[admin-debug] expected:", JSON.stringify(expected));
  console.log("[admin-debug] match:", adminPass === expected);

  if (adminPass !== expected)
    return NextResponse.json({ 
      error: "Não autorizado",
      debug_received_length: adminPass?.length ?? 0,
      debug_expected_length: expected?.length ?? 0,
      debug_match: adminPass === expected,
    }, { status: 401 });

  const { data, error } = await supabaseAdmin()
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const adminPass = req.headers.get("x-admin-password");
  if (adminPass !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const { title, slug, excerpt, content, published, cover_url } = body;
  if (!title || !slug || !content)
    return NextResponse.json({ error: "Campos obrigatórios: title, slug, content" }, { status: 400 });

  const { data, error } = await supabaseAdmin()
    .from("posts")
    .insert({ title, slug, excerpt, content, published: published ?? false, cover_url })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const adminPass = req.headers.get("x-admin-password");
  if (adminPass !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "ID necessário" }, { status: 400 });

  const { data, error } = await supabaseAdmin()
    .from("posts")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const adminPass = req.headers.get("x-admin-password");
  if (adminPass !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID necessário" }, { status: 400 });

  const { error } = await supabaseAdmin().from("posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
