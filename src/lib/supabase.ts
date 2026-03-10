import { createClient } from "@supabase/supabase-js";

// These are called at request-time (not build-time), so env vars are available
export function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  cover_url?: string;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  email: string;
  name?: string;
  source: string;
  created_at: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};
