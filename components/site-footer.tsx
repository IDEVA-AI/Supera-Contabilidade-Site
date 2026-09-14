import Link from "next/link";
import { instagramUrl, site, whatsappUrl } from "@/site.config";
import { Container } from "@/components/container";
import { Azulejo } from "@/components/azulejo";
import { nav } from "@/components/site-header";

// No celular o menu do topo some, então o rodapé é o caminho pro blog e pras seções.
export function SiteFooter() {
  return (
    <footer className="bg-ardosia text-white">
      <div className="h-16 bg-marinho">
        <Azulejo id="azulejo-rodape" size={64} className="text-prata" />
      </div>

      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold">{site.name}</p>
          <p className="mt-2 text-white/70">{site.tagline}</p>
        </div>

        <div className="space-y-2 text-white/80">
          <p className="mb-3 text-sm font-medium text-white/55">Contato</p>
          <p>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              WhatsApp
            </a>
          </p>
          {instagramUrl && (
            <p>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </p>
          )}
          {site.contact.phoneLabel && (
            <p>
              <a href={`tel:${site.contact.phone}`} className="hover:text-white">
                {site.contact.phoneLabel}
              </a>
            </p>
          )}
          {site.contact.email && (
            <p>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </p>
          )}
          {site.contact.hours && <p>{site.contact.hours}</p>}
        </div>

        <nav aria-label="Rodapé" className="space-y-2 text-white/80">
          <p className="mb-3 text-sm font-medium text-white/55">No site</p>
          {nav.map((item) => (
            <p key={item.href}>
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            </p>
          ))}
        </nav>

        <div className="space-y-2 text-white/80">
          <p className="mb-3 text-sm font-medium text-white/55">Empresa</p>
          <p>
            {site.contact.city}, {site.contact.state}
          </p>
          <p>CNPJ {site.cnpj}</p>
        </div>
      </Container>

      <Container className="border-t border-white/15 py-6">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
