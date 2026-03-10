import { NextResponse } from "next/server";

export async function GET() {
  const pass = process.env.ADMIN_PASSWORD;
  return NextResponse.json({
    ADMIN_PASSWORD_set: !!pass,
    ADMIN_PASSWORD_length: pass?.length ?? 0,
    ADMIN_PASSWORD_preview: pass ? pass.slice(0, 2) + "***" : "(vazio)",
  });
}
