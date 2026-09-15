import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { MobileContactBar } from "@/components/mobile-contact-bar";

// Casca do site institucional (home e blog). A landing page de anúncio fica fora
// deste grupo de propósito: sem menu, pra não ter saída além do WhatsApp.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    // pb no mobile pra barra fixa de contato não cobrir o fim da página
    <div className="pb-20 md:pb-0">
      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
      <MobileContactBar />
    </div>
  );
}
