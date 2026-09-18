import Link from "next/link";
import { site, whatsappUrl } from "@/site.config";
import { Container } from "@/components/container";
import { WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

// Links com "/#" pra funcionarem também de dentro do blog.
export const nav = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-comeca", label: "Como começa" },
  { href: "/#quem-somos", label: "Quem somos" },
  { href: "/#duvidas", label: "Dúvidas" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-nevoa/70 bg-branco/90 backdrop-blur">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 text-sm lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-aco transition-colors hover:text-ardosia"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full bg-marinho px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ardosia md:inline-flex"
        >
          <WhatsAppIcon className="size-4" />
          {site.cta.primary}
        </a>
      </Container>
    </header>
  );
}
