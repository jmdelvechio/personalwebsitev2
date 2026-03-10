import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[#E0DAD3] bg-[#F5F2ED]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <p
              className="text-2xl font-light text-[#0A0A0A] mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              João Vechio
            </p>
            <p className="text-sm text-[#6B6560] leading-relaxed max-w-xs">
              Especialista em RH & IA. Ajudo lideranças a transformar gente e cultura com inteligência artificial.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-5">Navegação</p>
            <ul className="space-y-3">
              {[
                { label: "Sobre", href: "/#sobre" },
                { label: "Ebooks", href: "/#ebooks" },
                { label: "Blog", href: "/blog" },
                { label: "Contato", href: "/#contato" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#6B6560] hover:text-[#C8572A] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-[#6B6560] mb-5">Conecte-se</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/joaovechio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6B6560] hover:text-[#C8572A] transition-colors"
                >
                  LinkedIn — João Vechio
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/h2rs-consulting/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6B6560] hover:text-[#C8572A] transition-colors"
                >
                  LinkedIn — H2RS Consulting
                </a>
              </li>
              <li>
                <a
                  href="https://www.h2rsconsulting.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#6B6560] hover:text-[#C8572A] transition-colors"
                >
                  H2RS Consulting
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-[#E0DAD3] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#6B6560]">
            © {year} João Vechio. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#6B6560]">
            Sócio da{" "}
            <a
              href="https://www.h2rsconsulting.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8572A] transition-colors"
            >
              H2RS Consulting
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
