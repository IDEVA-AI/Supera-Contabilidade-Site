import Link from "next/link";
import { site, whatsappUrl } from "@/site.config";
import { Container } from "@/components/container";

// Links com "/#" pra funcionarem também de dentro do blog.
const nav = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-comeca", label: "Como começa" },
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#duvidas", label: "Dúvidas" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-fio/70 bg-cal/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold tracking-tight">Supera</span>
          <span className="text-sm text-tinta-suave">contabilidade</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 text-sm lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-tinta-suave transition-colors hover:text-tinta"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-azulejo px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-azulejo-escuro md:inline-flex"
        >
          {site.cta.primary}
        </a>
      </Container>
    </header>
  );
}
