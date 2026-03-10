import { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog — João Vechio",
  description: "Pensamentos e perspectivas sobre RH, Inteligência Artificial e o futuro do trabalho.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { data: posts } = await supabase()
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F5F2ED]">
        {/* Header */}
        <div className="pt-40 pb-20 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#C8572A]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#C8572A] font-medium">Blog</span>
            </div>
            <h1
              className="text-white"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 7vw, 5.5rem)",
                fontWeight: 300,
                lineHeight: 1.05,
              }}
            >
              Pensamentos &
              <br />
              <span className="italic text-[#C8572A]">Perspectivas</span>
            </h1>
          </div>
        </div>

        {/* Posts */}
        <div className="max-w-6xl mx-auto px-6 py-24">
          {!posts || posts.length === 0 ? (
            <div className="py-24 text-center">
              <p
                className="text-[#0A0A0A] mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 300 }}
              >
                Em breve.
              </p>
              <p className="text-[#6B6560]">
                Os primeiros artigos estão a caminho. Cadastre-se na{" "}
                <Link href="/#newsletter" className="text-[#C8572A] hover:underline">
                  newsletter
                </Link>{" "}
                para ser notificado.
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {(posts as Post[]).map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-10 py-10 border-b border-[#E0DAD3] hover:bg-white/50 -mx-6 px-6 transition-colors"
                >
                  <span
                    className="text-[#E0DAD3] text-sm font-mono shrink-0 pt-1"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <time className="text-xs tracking-widest uppercase text-[#6B6560] mb-3 block">
                      {new Date(post.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h2
                      className="text-[#0A0A0A] mb-2 group-hover:text-[#C8572A] transition-colors"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.75rem",
                        fontWeight: 400,
                      }}
                    >
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[#6B6560] text-sm leading-relaxed max-w-2xl">{post.excerpt}</p>
                    )}
                  </div>
                  <span className="text-[#C8572A] text-lg shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
