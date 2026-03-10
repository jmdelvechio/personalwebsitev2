"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/lib/supabase";

type Tab = "posts" | "leads" | "contacts" | "new";
type Lead = { id: string; email: string; name?: string; source: string; created_at: string };
type Contact = { id: string; name: string; email: string; subject?: string; message: string; created_at: string };

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [tab, setTab] = useState<Tab>("posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", published: false, cover_url: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    // verify against API
    const res = await fetch("/api/posts", { headers: { "x-admin-password": password } });
    if (res.ok) {
      setAuthed(true);
      setAuthError(false);
      fetchAll();
    } else {
      setAuthError(true);
    }
  }

  async function fetchAll() {
    const [pRes, lRes, cRes] = await Promise.all([
      fetch("/api/posts", { headers: { "x-admin-password": password } }),
      fetch("/api/leads", { headers: { "x-admin-password": password } }),
      fetch("/api/contact", { headers: { "x-admin-password": password } }),
    ]);
    if (pRes.ok) setPosts(await pRes.json());
    if (lRes.ok) setLeads(await lRes.json());
    if (cRes.ok) setContacts(await cRes.json());
  }

  function newPost() {
    setEditing(null);
    setForm({ title: "", slug: "", excerpt: "", content: "", published: false, cover_url: "" });
    setTab("new");
  }

  function editPost(post: Post) {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content,
      published: post.published,
      cover_url: post.cover_url ?? "",
    });
    setTab("new");
  }

  async function savePost(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    const method = editing ? "PATCH" : "POST";
    const body = editing ? { id: editing.id, ...form } : form;
    const res = await fetch("/api/posts", {
      method,
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMsg(editing ? "Post atualizado!" : "Post criado!");
      fetchAll();
      setEditing(null);
      setTab("posts");
    } else {
      const err = await res.json();
      setMsg(`Erro: ${err.error}`);
    }
    setSaving(false);
  }

  async function deletePost(id: string) {
    if (!confirm("Deletar este post?")) return;
    await fetch("/api/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
    fetchAll();
  }

  async function togglePublish(post: Post) {
    await fetch("/api/posts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });
    fetchAll();
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <form onSubmit={login} className="w-full max-w-sm">
          <div className="mb-10 text-center">
            <p
              className="text-white text-3xl font-light mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Admin
            </p>
            <p className="text-[#4A4A4A] text-sm">joaovechio.com</p>
          </div>
          <div className="border border-[#1E1E1E]">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none text-sm border-b border-[#1E1E1E]"
            />
            <button
              type="submit"
              className="w-full py-4 bg-[#C8572A] text-white text-sm font-medium tracking-widest uppercase hover:bg-[#B04820] transition-colors"
            >
              Entrar
            </button>
          </div>
          {authError && <p className="text-[#C8572A] text-sm mt-4 text-center">Senha incorreta.</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="border-b border-[#1E1E1E] px-8 py-5 flex items-center justify-between">
        <p className="font-light text-lg" style={{ fontFamily: "var(--font-display)" }}>
          João Vechio <span className="text-[#4A4A4A] text-sm ml-2">/ Admin</span>
        </p>
        <a href="/" target="_blank" className="text-xs tracking-widest uppercase text-[#6B6560] hover:text-[#C8572A] transition-colors">
          Ver site →
        </a>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1E1E1E] px-8 flex gap-0">
        {(["posts", "leads", "contacts"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-4 text-xs tracking-widest uppercase transition-colors border-b-2 ${
              tab === t
                ? "text-white border-[#C8572A]"
                : "text-[#4A4A4A] border-transparent hover:text-[#6B6560]"
            }`}
          >
            {t === "posts" ? `Posts (${posts.length})` : t === "leads" ? `Leads (${leads.length})` : `Contatos (${contacts.length})`}
          </button>
        ))}
        <button
          onClick={newPost}
          className="ml-auto my-2 px-5 py-2 bg-[#C8572A] text-white text-xs tracking-widest uppercase hover:bg-[#B04820] transition-colors"
        >
          + Novo Post
        </button>
      </div>

      <div className="p-8">
        {/* POSTS LIST */}
        {tab === "posts" && (
          <div>
            {posts.length === 0 ? (
              <div className="py-20 text-center text-[#4A4A4A]">
                <p className="mb-4" style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>Nenhum post ainda.</p>
                <button onClick={newPost} className="text-[#C8572A] text-sm tracking-widest uppercase hover:underline">
                  Criar primeiro post →
                </button>
              </div>
            ) : (
              <div className="space-y-0">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center gap-4 py-5 border-b border-[#1E1E1E] group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-light text-lg group-hover:text-[#C8572A] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                        {post.title}
                      </p>
                      <p className="text-xs text-[#4A4A4A] mt-1">/{post.slug}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs tracking-widest uppercase shrink-0 ${
                        post.published
                          ? "bg-[#C8572A]/20 text-[#C8572A]"
                          : "bg-[#1E1E1E] text-[#4A4A4A]"
                      }`}
                    >
                      {post.published ? "Publicado" : "Rascunho"}
                    </span>
                    <div className="flex gap-4 shrink-0">
                      <button
                        onClick={() => togglePublish(post)}
                        className="text-xs text-[#6B6560] hover:text-white transition-colors tracking-wide"
                      >
                        {post.published ? "Despublicar" : "Publicar"}
                      </button>
                      <button
                        onClick={() => editPost(post)}
                        className="text-xs text-[#6B6560] hover:text-white transition-colors tracking-wide"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-xs text-[#6B6560] hover:text-[#C8572A] transition-colors tracking-wide"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NEW / EDIT POST */}
        {tab === "new" && (
          <div className="max-w-3xl">
            <h2 className="text-xl font-light mb-8" style={{ fontFamily: "var(--font-display)" }}>
              {editing ? "Editar Post" : "Novo Post"}
            </h2>
            <form onSubmit={savePost} className="space-y-0 border border-[#1E1E1E]">
              <input
                required
                type="text"
                placeholder="Título do artigo"
                value={form.title}
                onChange={(e) => {
                  const t = e.target.value;
                  setForm({ ...form, title: t, slug: editing ? form.slug : slugify(t) });
                }}
                className="w-full px-6 py-4 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none text-lg border-b border-[#1E1E1E]"
                style={{ fontFamily: "var(--font-display)" }}
              />
              <input
                required
                type="text"
                placeholder="slug-do-artigo"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-6 py-4 bg-transparent text-[#6B6560] placeholder:text-[#3A3A3A] focus:outline-none text-sm border-b border-[#1E1E1E] font-mono"
              />
              <input
                type="text"
                placeholder="Resumo (opcional — aparece na listagem)"
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-6 py-4 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none text-sm border-b border-[#1E1E1E]"
              />
              <input
                type="url"
                placeholder="URL da imagem de capa (opcional)"
                value={form.cover_url}
                onChange={(e) => setForm({ ...form, cover_url: e.target.value })}
                className="w-full px-6 py-4 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none text-sm border-b border-[#1E1E1E]"
              />
              <textarea
                required
                placeholder="Conteúdo em HTML (ex: <p>Texto</p><h2>Seção</h2>)"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={16}
                className="w-full px-6 py-4 bg-transparent text-white placeholder:text-[#3A3A3A] focus:outline-none text-sm resize-y border-b border-[#1E1E1E] font-mono"
              />
              <div className="flex items-center justify-between px-6 py-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4 accent-[#C8572A]"
                  />
                  <span className="text-sm text-[#6B6560]">Publicar agora</span>
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setTab("posts")}
                    className="text-sm text-[#6B6560] hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-8 py-3 bg-[#C8572A] text-white text-sm tracking-widest uppercase hover:bg-[#B04820] transition-colors disabled:opacity-60"
                  >
                    {saving ? "Salvando..." : editing ? "Atualizar" : "Criar Post"}
                  </button>
                </div>
              </div>
            </form>
            {msg && <p className="mt-4 text-sm text-[#C8572A]">{msg}</p>}
          </div>
        )}

        {/* LEADS */}
        {tab === "leads" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-[#6B6560] text-sm">{leads.length} inscritos na newsletter</p>
            </div>
            <div className="border border-[#1E1E1E] divide-y divide-[#1E1E1E]">
              {leads.length === 0 ? (
                <p className="px-6 py-10 text-[#4A4A4A] text-sm text-center">Nenhum lead ainda.</p>
              ) : (
                leads.map((lead) => (
                  <div key={lead.id} className="flex items-center gap-6 px-6 py-4">
                    <div className="flex-1">
                      <p className="text-white text-sm">{lead.email}</p>
                      {lead.name && <p className="text-[#6B6560] text-xs mt-0.5">{lead.name}</p>}
                    </div>
                    <span className="text-xs text-[#4A4A4A] tracking-widest uppercase shrink-0">{lead.source}</span>
                    <span className="text-xs text-[#4A4A4A] shrink-0">
                      {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {tab === "contacts" && (
          <div>
            <p className="text-[#6B6560] text-sm mb-6">{contacts.length} mensagens recebidas</p>
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <p className="text-[#4A4A4A] text-sm text-center py-10">Nenhuma mensagem ainda.</p>
              ) : (
                contacts.map((c) => (
                  <div key={c.id} className="border border-[#1E1E1E] p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <p className="text-white font-medium">{c.name}</p>
                        <p className="text-[#6B6560] text-sm">{c.email}</p>
                      </div>
                      <span className="text-xs text-[#4A4A4A] shrink-0">
                        {new Date(c.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    {c.subject && (
                      <p className="text-xs tracking-widest uppercase text-[#C8572A] mb-2">{c.subject}</p>
                    )}
                    <p className="text-[#B5AFA8] text-sm leading-relaxed">{c.message}</p>
                    <a
                      href={`mailto:${c.email}?subject=Re: ${c.subject ?? "Seu contato"}`}
                      className="mt-4 inline-block text-xs tracking-widest uppercase text-[#6B6560] hover:text-[#C8572A] transition-colors"
                    >
                      Responder →
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
