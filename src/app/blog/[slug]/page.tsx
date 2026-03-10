import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await supabase()
    .from("posts")
    .select("title, excerpt")
    .eq("slug", params.slug)
    .single();
  if (!data) return { title: "Post não encontrado" };
  return { title: `${data.title} — João Vechio`, description: data.excerpt };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase()
    .from("posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("published", true)
    .single();

  if (!post) notFound();
  const p = post as Post;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F5F2ED]">
        {/* Header */}
        <div className="pt-40 pb-20 bg-[#0A0A0A]">
          <div className="max-w-3xl mx-auto px-6">
            <Link
              href="/blog"
              className="text-xs tracking-widest uppercase text-[#6B6560] hover:text-[#C8572A] transition-colors mb-10 block"
            >
              ← Blog
            </Link>
            <time className="text-xs tracking-widest uppercase text-[#C8572A] mb-6 block">
              {new Date(p.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </time>
            <h1
              className="text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              {p.title}
            </h1>
            {p.excerpt && (
              <p className="text-[#6B6560] text-lg mt-6 leading-relaxed">{p.excerpt}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6 py-20">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: p.content }}
          />

          {/* Author card */}
          <div className="mt-20 pt-10 border-t border-[#E0DAD3] flex items-center gap-6">
            <div className="w-14 h-14 bg-[#0A0A0A] flex items-center justify-center shrink-0">
              <span style={{ fontFamily: "var(--font-display)", color: "#C8572A", fontSize: "1.2rem" }}>JV</span>
            </div>
            <div>
              <p className="font-medium text-[#0A0A0A]">João Vechio</p>
              <p className="text-sm text-[#6B6560]">
                Especialista em RH & IA · Sócio da{" "}
                <a href="https://www.h2rsconsulting.com/" target="_blank" rel="noopener noreferrer" className="text-[#C8572A] hover:underline">
                  H2RS Consulting
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
