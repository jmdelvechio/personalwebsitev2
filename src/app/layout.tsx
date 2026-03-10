import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "João Vechio — Especialista em RH & IA",
  description:
    "Ajudo lideranças a transformar gente e cultura com inteligência artificial. Consultor, autor e sócio da H2RS Consulting.",
  keywords: ["RH", "Inteligência Artificial", "Gestão de Pessoas", "L&D", "Transformação Digital"],
  authors: [{ name: "João Vechio" }],
  openGraph: {
    title: "João Vechio — Especialista em RH & IA",
    description:
      "Ajudo lideranças a transformar gente e cultura com inteligência artificial.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
