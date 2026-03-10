"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F5F2ED]/95 backdrop-blur-sm border-b border-[#E0DAD3]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-light tracking-wide text-[#0A0A0A] hover:text-[#C8572A] transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          João Vechio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: "Sobre", href: "/#sobre" },
            { label: "Ebooks", href: "/#ebooks" },
            { label: "Blog", href: "/blog" },
            { label: "Contato", href: "/#contato" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-widest uppercase text-[#6B6560] hover:text-[#C8572A] transition-colors"
              style={{ fontFamily: "var(--font-body)", letterSpacing: "0.12em" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://go.hotmart.com/S104821475Y?dp=1"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2.5 bg-[#C8572A] text-white text-sm font-medium tracking-wider uppercase hover:bg-[#B04820] transition-colors"
            style={{ letterSpacing: "0.08em" }}
          >
            Adquirir Ebook
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
          <span className={`block w-6 h-px bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#0A0A0A] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#F5F2ED] border-t border-[#E0DAD3] overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-6">
          {[
            { label: "Sobre", href: "/#sobre" },
            { label: "Ebooks", href: "/#ebooks" },
            { label: "Blog", href: "/blog" },
            { label: "Contato", href: "/#contato" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-widest uppercase text-[#6B6560] hover:text-[#C8572A] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://go.hotmart.com/S104821475Y?dp=1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit px-5 py-2.5 bg-[#C8572A] text-white text-sm font-medium tracking-wider uppercase"
          >
            Adquirir Ebook
          </a>
        </nav>
      </div>
    </header>
  );
}
