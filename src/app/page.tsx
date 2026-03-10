"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/lib/useScrollReveal";
import type { Post } from "@/lib/supabase";

export default function Home() {
  useScrollReveal();
  const [posts, setPosts] = useState<Post[]>([]);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts/public");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (e) {
        console.error("fetchPosts error", e);
      }
    }
    fetchPosts();
  }, []);

  async function handleLead(e: React.FormEvent) {
    e.preventDefault();
    setLeadStatus("loading");
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: leadEmail, source: "newsletter" }),
    });
    setLeadStatus(res.ok ? "success" : "error");
  }

  async function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setContactStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactForm),
    });
    setContactStatus(res.ok ? "success" : "error");
    if (res.ok) setContactForm({ name: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <Navbar />
      <main>
        {/* ═══════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0A]">
          {/* Background grid lines */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#F5F2ED 1px, transparent 1px), linear-gradient(90deg, #F5F2ED 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
            }}
          />

          {/* Accent glow */}
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-[#C8572A] opacity-[0.06] blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#C8572A] opacity-[0.04] blur-[100px]" />

          <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-24">
            <div className="max-w-4xl">
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-10" style={{ animation: "fadeUp 0.6s ease 0.1s both" }}>
                <div className="w-8 h-px bg-[#C8572A]" />
                <span
                  className="text-xs tracking-[0.25em] uppercase text-[#C8572A] font-medium"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Especialista em RH & IA
                </span>
              </div>

              {/* Heading */}
              <h1
                className="text-white mb-8"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  animation: "fadeUp 0.7s ease 0.2s both",
                }}
              >
                Gente.
                <br />
                <span className="text-[#C8572A] italic">Cultura.</span>
                <br />
                Inteligência.
              </h1>

              {/* Subheading */}
              <p
                className="text-[#B5AFA8] text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  animation: "fadeUp 0.7s ease 0.35s both",
                }}
              >
                Ajudo lideranças a transformar gente e cultura com inteligência artificial —
                sem perder o que há de mais humano nas organizações.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row gap-4"
                style={{ animation: "fadeUp 0.7s ease 0.5s both" }}
              >
                <a
                  href="/ebooks/gente-e-ai.pdf"
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#C8572A] text-white font-medium tracking-wide hover:bg-[#B04820] transition-colors text-sm uppercase"
                  style={{ letterSpacing: "0.1em" }}
                >
                  <span>↓</span> Baixar Ebook Grátis
                </a>
                <a
                  href="#sobre"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-[#3A3A3A] text-[#B5AFA8] font-medium tracking-wide hover:border-[#C8572A] hover:text-white transition-all text-sm uppercase"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Conhecer meu trabalho
                </a>
              </div>
            </div>

            {/* Scroll indicator */}
            <div
              className="absolute bottom-12 left-6 flex items-center gap-3"
              style={{ animation: "fadeIn 1s ease 1s both" }}
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#3A3A3A]" />
              <span
                className="text-[10px] tracking-[0.3em] uppercase text-[#4A4A4A] rotate-90 origin-left translate-y-8"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Scroll
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            SOBRE
        ═══════════════════════════════════════════════════ */}
        <section id="sobre" className="py-32 bg-[#F5F2ED]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Photo placeholder */}
              <div className="reveal order-2 lg:order-1">
                <div className="relative">
                  <div className="aspect-[4/5] bg-[#E0DAD3] relative overflow-hidden">
                    <Image
                      src="/foto-joao.png"
                      alt="João Vechio"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Decorative corner */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#C8572A] z-10" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#C8572A] z-10" />
                  </div>
                  {/* Floating card */}
                  <div className="absolute -bottom-8 -right-8 bg-[#0A0A0A] text-white p-6 w-48">
                    <p className="text-3xl font-light" style={{ fontFamily: "var(--font-display)" }}>15+</p>
                    <p className="text-xs tracking-widest uppercase text-[#6B6560] mt-1">Anos de experiência</p>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className="order-1 lg:order-2">
                <div className="reveal flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-[#C8572A]" />
                  <span className="text-xs tracking-[0.25em] uppercase text-[#C8572A] font-medium">Sobre mim</span>
                </div>

                <h2
                  className="reveal reveal-delay-1 text-[#0A0A0A] mb-8"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                  }}
                >
                  Onde a estratégia de
                  <span className="italic text-[#C8572A]"> pessoas</span> encontra a era da IA
                </h2>

                <div className="reveal reveal-delay-2 space-y-5 text-[#3A3A3A]" style={{ fontWeight: 300 }}>
                  <p>
                    Sou João Vechio — consultor de Estratégia de Pessoas, L&D e Customer Performance,
                    com mais de 15 anos ajudando empresas a conectar talento, cultura e resultado.
                    Sou sócio da <a href="https://www.h2rsconsulting.com/" target="_blank" rel="noopener noreferrer" className="text-[#C8572A] hover:underline">H2RS Consulting</a>.
                  </p>
                  <p>
                    Nos últimos anos, mergulhei de cabeça na intersecção entre RH e Inteligência Artificial.
                    Minha convicção é clara: a IA não vai substituir os profissionais de RH que sabem
                    usá-la. Vai substituir os que não souberem.
                  </p>
                  <p>
                    Escrevo, falo e consulto sobre como líderes e equipes de RH podem dominar as ferramentas
                    de IA para ampliar seu impacto — sem perder a essência do que é cuidar de gente.
                  </p>
                </div>

                {/* Expertise pills */}
                <div className="reveal reveal-delay-3 flex flex-wrap gap-3 mt-10">
                  {["L&D Strategy", "RH & IA", "Customer Performance", "Gestão de Pessoas", "Prompt Engineering"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 border border-[#E0DAD3] text-xs tracking-widest uppercase text-[#6B6560] hover:border-[#C8572A] hover:text-[#C8572A] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* H2RS link */}
                <div className="reveal reveal-delay-4 mt-10 pt-10 border-t border-[#E0DAD3] flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs tracking-widest uppercase text-[#6B6560]">Sócio de</span>
                    <a
                      href="https://www.h2rsconsulting.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#0A0A0A] hover:text-[#C8572A] transition-colors"
                      style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem" }}
                    >
                      H2RS Consulting →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            NÚMEROS / IMPACTO
        ═══════════════════════════════════════════════════ */}
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-[#1E1E1E]">
              {[
                { number: "15+", label: "Anos de experiência" },
                { number: "2", label: "Ebooks publicados" },
                { number: "31", label: "Templates de prompt" },
                { number: "∞", label: "Potencial humano" },
              ].map((stat, i) => (
                <div key={i} className={`reveal reveal-delay-${i + 1} px-8 py-10 text-center`}>
                  <p
                    className="text-white mb-2"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      fontWeight: 300,
                      color: i === 0 || i === 2 ? "#C8572A" : "white",
                    }}
                  >
                    {stat.number}
                  </p>
                  <p className="text-xs tracking-widest uppercase text-[#4A4A4A]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            EBOOKS
        ═══════════════════════════════════════════════════ */}
        <section id="ebooks" className="py-32 bg-[#F5F2ED]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="reveal flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-[#C8572A]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#C8572A] font-medium">Publicações</span>
            </div>

            <h2
              className="reveal reveal-delay-1 text-[#0A0A0A] mb-20"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 300,
                lineHeight: 1.1,
              }}
            >
              Conhecimento que
              <br />
              <span className="italic text-[#C8572A]">transforma</span> equipes
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Ebook 1 — Free */}
              <div className="reveal group bg-white border border-[#E0DAD3] p-10 hover:border-[#C8572A]/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-start justify-between mb-8">
                  <span className="px-3 py-1 bg-[#C8572A]/10 text-[#C8572A] text-xs tracking-widest uppercase font-medium">
                    Gratuito
                  </span>
                  <span className="text-4xl font-light text-[#E0DAD3]" style={{ fontFamily: "var(--font-display)" }}>01</span>
                </div>

                {/* Book cover placeholder */}
                <div className="aspect-[3/4] bg-[#0A0A0A] mb-8 flex items-center justify-center relative overflow-hidden max-w-[180px]">
                  <div className="text-center p-6">
                    <p className="text-[#C8572A] text-xs tracking-widest uppercase mb-3">Gente</p>
                    <p className="text-white text-xl font-light" style={{ fontFamily: "var(--font-display)" }}>&</p>
                    <p className="text-white text-xs tracking-widest uppercase mt-1">AI</p>
                    <div className="w-8 h-px bg-[#C8572A] mx-auto mt-4" />
                    <p className="text-[#6B6560] text-[10px] tracking-widest uppercase mt-3">João Vechio</p>
                  </div>
                </div>

                <h3
                  className="text-[#0A0A0A] mb-3"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400 }}
                >
                  Gente & AI
                </h3>
                <p className="text-[#6B6560] text-sm leading-relaxed mb-8">
                  31 prompts prontos para profissionais de RH que querem usar o Claude para trabalhar
                  com mais inteligência, agilidade e impacto. Prático, direto e aplicável hoje.
                </p>

                <a
                  href="/ebooks/gente-e-ai.pdf"
                  download="Gente-e-AI-Joao-Vechio.pdf"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#0A0A0A] text-white font-medium text-sm tracking-wide uppercase hover:bg-[#C8572A] transition-colors w-full justify-center"
                  style={{ letterSpacing: "0.1em" }}
                >
                  ↓ Download Gratuito
                </a>
              </div>

              {/* Ebook 2 — Paid */}
              <div className="reveal reveal-delay-2 group bg-[#0A0A0A] border border-[#1E1E1E] p-10 hover:border-[#C8572A]/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-start justify-between mb-8">
                  <span className="px-3 py-1 bg-[#C8572A] text-white text-xs tracking-widest uppercase font-medium">
                    Ebook Premium
                  </span>
                  <span className="text-4xl font-light text-[#1E1E1E]" style={{ fontFamily: "var(--font-display)" }}>02</span>
                </div>

                {/* Book cover with real image */}
                <div className="aspect-[3/4] relative mb-8 overflow-hidden max-w-[180px] bg-[#1A1A1A]">
                  <Image
                    src="/ebooks/cover-rh-ia.png"
                    alt="O RH que a IA não vai substituir"
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>

                <h3
                  className="text-white mb-3"
                  style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 400 }}
                >
                  O RH que a IA não vai substituir
                </h3>
                <p className="text-[#6B6560] text-sm leading-relaxed mb-8">
                  31 templates de engenharia de prompt para quem quer liderar a transformação, não ser
                  arrastado por ela. Para profissionais de RH prontos para o próximo nível.
                </p>

                <a
                  href="https://go.hotmart.com/S104821475Y?dp=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#C8572A] text-white font-medium text-sm tracking-wide uppercase hover:bg-[#B04820] transition-colors w-full justify-center"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Adquirir na Hotmart →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            NEWSLETTER LEAD CAPTURE
        ═══════════════════════════════════════════════════ */}
        <section className="py-24 bg-[#C8572A]">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="reveal">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-5">Newsletter</p>
              <h2
                className="text-white mb-5"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                }}
              >
                RH & IA na sua caixa de entrada
              </h2>
              <p className="text-white/70 mb-10 max-w-lg mx-auto">
                Insights práticos sobre inteligência artificial aplicada a gestão de pessoas.
                Sem enrolação, direto ao ponto.
              </p>

              {leadStatus === "success" ? (
                <div className="inline-flex items-center gap-3 bg-white/10 px-8 py-4 text-white">
                  ✓ Você está na lista. Obrigado!
                </div>
              ) : (
                <form onSubmit={handleLead} className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Seu melhor e-mail"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    className="px-8 py-4 bg-white text-[#C8572A] font-medium text-sm tracking-wide uppercase hover:bg-[#F5F2ED] transition-colors disabled:opacity-60"
                    style={{ letterSpacing: "0.1em" }}
                  >
                    {leadStatus === "loading" ? "..." : "Inscrever"}
                  </button>
                </form>
              )}
              {leadStatus === "error" && (
                <p className="mt-3 text-white/60 text-sm">Algo deu errado. Tente novamente.</p>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            BLOG PREVIEW
        ═══════════════════════════════════════════════════ */}
        <section id="blog" className="py-32 bg-[#F5F2ED]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="reveal flex items-center justify-between mb-16 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-[#C8572A]" />
                  <span className="text-xs tracking-[0.25em] uppercase text-[#C8572A] font-medium">Blog</span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 300,
                  }}
                >
                  Pensamentos & Perspectivas
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm text-[#6B6560] hover:text-[#C8572A] tracking-widest uppercase transition-colors"
                style={{ letterSpacing: "0.15em" }}
              >
                Ver todos →
              </Link>
            </div>

            {posts.length === 0 ? (
              <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-[#E0DAD3] p-8">
                    <div className="w-12 h-px bg-[#E0DAD3] mb-6" />
                    <div className="h-4 bg-[#E0DAD3] rounded mb-3 w-3/4" />
                    <div className="h-3 bg-[#E0DAD3] rounded mb-2" />
                    <div className="h-3 bg-[#E0DAD3] rounded w-2/3" />
                    <p className="text-xs text-[#6B6560] mt-6 tracking-widest uppercase">Em breve</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className={`reveal reveal-delay-${i + 1} group block border border-[#E0DAD3] p-8 hover:border-[#C8572A]/40 hover:shadow-lg transition-all duration-300`}
                  >
                    <time className="text-xs tracking-widest uppercase text-[#6B6560] mb-5 block">
                      {new Date(post.created_at).toLocaleDateString("pt-BR", {
                        day: "2-digit", month: "long", year: "numeric"
                      })}
                    </time>
                    <h3
                      className="text-[#0A0A0A] mb-3 group-hover:text-[#C8572A] transition-colors"
                      style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 400 }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#6B6560] leading-relaxed">{post.excerpt}</p>
                    <div className="mt-6 text-xs tracking-widest uppercase text-[#C8572A] opacity-0 group-hover:opacity-100 transition-opacity">
                      Ler artigo →
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CONTATO
        ═══════════════════════════════════════════════════ */}
        <section id="contato" className="py-32 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Left */}
              <div>
                <div className="reveal flex items-center gap-4 mb-8">
                  <div className="w-8 h-px bg-[#C8572A]" />
                  <span className="text-xs tracking-[0.25em] uppercase text-[#C8572A] font-medium">Contato</span>
                </div>

                <h2
                  className="reveal reveal-delay-1 text-white mb-8"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    fontWeight: 300,
                    lineHeight: 1.1,
                  }}
                >
                  Vamos falar sobre
                  <br />
                  <span className="italic text-[#C8572A]">o futuro</span> do seu RH
                </h2>

                <p className="reveal reveal-delay-2 text-[#6B6560] mb-10 leading-relaxed">
                  Estou disponível para palestras, workshops, consultorias e projetos que
                  envolvam a transformação de equipes de RH com IA.
                </p>

                <div className="reveal reveal-delay-3 space-y-6">
                  {[
                    { label: "LinkedIn Pessoal", href: "https://www.linkedin.com/in/joaovechio/", text: "/in/joaovechio" },
                    { label: "LinkedIn H2RS", href: "https://www.linkedin.com/company/h2rs-consulting/", text: "/company/h2rs-consulting" },
                    { label: "Site H2RS", href: "https://www.h2rsconsulting.com/", text: "h2rsconsulting.com" },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-8 h-px bg-[#3A3A3A] group-hover:bg-[#C8572A] transition-colors" />
                      <div>
                        <p className="text-xs tracking-widest uppercase text-[#4A4A4A]">{link.label}</p>
                        <p className="text-[#B5AFA8] group-hover:text-[#C8572A] transition-colors text-sm mt-0.5">{link.text}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="reveal reveal-delay-2">
                {contactStatus === "success" ? (
                  <div className="h-full flex items-center justify-center border border-[#1E1E1E] p-12 text-center">
                    <div>
                      <div className="w-12 h-12 border border-[#C8572A] flex items-center justify-center mx-auto mb-6">
                        <span className="text-[#C8572A] text-xl">✓</span>
                      </div>
                      <p className="text-white font-light text-xl mb-3" style={{ fontFamily: "var(--font-display)" }}>
                        Mensagem enviada.
                      </p>
                      <p className="text-[#6B6560] text-sm">Responderei em breve.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContact} className="space-y-0 border border-[#1E1E1E] p-10">
                    <div className="grid grid-cols-2 gap-0">
                      <div className="border-b border-r border-[#1E1E1E] p-0">
                        <input
                          required
                          type="text"
                          placeholder="Nome"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full px-5 py-5 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none text-sm border-none"
                        />
                      </div>
                      <div className="border-b border-[#1E1E1E] p-0">
                        <input
                          required
                          type="email"
                          placeholder="E-mail"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full px-5 py-5 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="border-b border-[#1E1E1E]">
                      <input
                        type="text"
                        placeholder="Assunto — palestra, consultoria, parceria..."
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full px-5 py-5 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none text-sm"
                      />
                    </div>
                    <div className="border-b border-[#1E1E1E]">
                      <textarea
                        required
                        placeholder="Sua mensagem"
                        rows={6}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full px-5 py-5 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none resize-none text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={contactStatus === "loading"}
                      className="w-full py-5 bg-[#C8572A] text-white font-medium text-sm tracking-widest uppercase hover:bg-[#B04820] transition-colors disabled:opacity-60"
                    >
                      {contactStatus === "loading" ? "Enviando..." : "Enviar Mensagem"}
                    </button>
                    {contactStatus === "error" && (
                      <p className="text-[#C8572A] text-sm pt-3 text-center">Erro ao enviar. Tente novamente.</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
