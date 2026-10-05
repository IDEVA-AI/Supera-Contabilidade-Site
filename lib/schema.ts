import { site, siteUrl } from "@/site.config";

// JSON-LD da organização. Só entra no schema o campo que existe de verdade:
// endereço meia-boca no Google é pior que endereço nenhum.
export function organizationSchema() {
  const address: Record<string, string> = {};
  if (site.contact.street) address.streetAddress = site.contact.street;
  if (site.contact.city) address.addressLocality = site.contact.city;
  if (site.contact.state) address.addressRegion = site.contact.state;
  if (site.contact.postalCode) address.postalCode = site.contact.postalCode;

  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: site.name,
    description: site.description,
    url: siteUrl,
    email: site.contact.email || undefined,
    telephone: site.contact.phone || undefined,
    areaServed: site.contact.region || undefined,
    address: Object.keys(address).length
      ? { "@type": "PostalAddress", addressCountry: "BR", ...address }
      : undefined,
    sameAs: [...site.profiles, site.googleProfileUrl].filter(Boolean).length
      ? [...site.profiles, site.googleProfileUrl].filter(Boolean)
      : undefined,
  };
}

// JSON-LD FAQPage. Mesmas perguntas que aparecem na tela, nunca outras: o Google
// só aceita marcação de conteúdo visível.
export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

// Texto pronto pra <script type="application/ld+json">. Escapa o "<" pra que um
// "</script>" escrito no frontmatter não feche a tag no meio do JSON.
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
