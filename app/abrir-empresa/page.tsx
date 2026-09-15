import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lp } from "@/content/lp-abrir-empresa";
import { site, whatsappUrl } from "@/site.config";
import { Container } from "@/components/container";
import { WhatsAppButton, external } from "@/components/sections";
import { MobileContactBar } from "@/components/mobile-contact-bar";
import { Placeholder } from "@/components/placeholder";

// Landing page de anúncio pra quem vai abrir empresa. Um objetivo só: abrir o
// WhatsApp com a mensagem da página. Sem menu. Conteúdo em content/lp-abrir-empresa.ts.

export const metadata: Metadata = {
  title: "Abrir empresa em Brasília",
  description:
    "Abertura de empresa no DF com o tipo de empresa e o regime de imposto escolhidos antes do CNPJ. Conversa direta no WhatsApp com a Supera Contabilidade.",
  alternates: { canonical: lp.path },
  robots: lp.draft ? { index: false, follow: false } : undefined,
};

const waUrl = whatsappUrl(lp.whatsappMessage);

function Check() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.5} className="mt-1 size-5 shrink-0 text-prata">
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AbrirEmpresaPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: lp.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <div className="pb-20 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {lp.draft && (
        <p className="bg-ardosia px-6 py-2 text-center text-sm text-white/85">
          Rascunho fora do Google. Os campos tracejados esperam dados da Supera.
        </p>
      )}

      <header className="sticky top-0 z-40 border-b border-nevoa/70 bg-branco/90 backdrop-blur">
        <Container className="flex h-18 items-center justify-between gap-6">
          <span className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold tracking-tight">Supera</span>
            <span className="text-sm text-aco">contabilidade</span>
          </span>
          <a
            href={waUrl}
            {...external}
            className="hidden rounded-full bg-marinho px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-ardosia sm:inline-flex"
          >
            Falar no WhatsApp
          </a>
        </Container>
      </header>

      <main id="conteudo">
        {/* Topo: a promessa é sair sabendo quanto vai pagar, que é o medo de quem abre. */}
        <section className="pt-10 pb-20 md:pt-16 md:pb-28">
          <Container className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-sm font-semibold text-marinho md:text-base">{lp.hero.eyebrow}</p>
              <h1 className="mt-4 font-display text-5xl font-bold leading-[0.98] tracking-tight text-balance md:text-7xl">
                {lp.hero.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-aco text-pretty">{lp.hero.intro}</p>
              <p className="mt-6 max-w-xl text-lg font-medium text-pretty">
                {lp.offer ?? (
                  <Placeholder>condição da abertura, ex.: sem custo pra quem fecha a contabilidade mensal</Placeholder>
                )}
              </p>
              <div className="mt-10">
                <WhatsAppButton label={lp.hero.cta} message={lp.whatsappMessage} />
              </div>
              <p className="mt-4 text-sm text-aco">{lp.hero.ctaNote}</p>
            </div>

            <aside className="overflow-hidden rounded-3xl rounded-tr-[72px] bg-marinho text-white lg:rounded-tr-[160px]">
              <Image
                src={lp.hero.image.src}
                alt={lp.hero.image.alt}
                width={1600}
                height={1067}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[16/9] w-full object-cover lg:aspect-[3/2]"
              />
              <div className="p-8 md:p-10">
                <p className="text-sm font-medium text-white/75">O que sai da abertura</p>
                <ul className="mt-4 space-y-3">
                  {lp.hero.outcomes.map((item) => (
                    <li key={item} className="flex gap-3 text-lg leading-snug">
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/20 pt-4 text-sm text-white/80">
                  Prazo: {lp.deadline ?? <Placeholder>prazo médio da Supera</Placeholder>}
                </p>
              </div>
            </aside>
          </Container>
        </section>

        <section className="bg-claro py-20 md:py-28">
          <Container>
            <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
              Onde a abertura costuma dar errado
            </h2>
            <p className="mt-5 max-w-xl text-lg text-aco text-pretty">
              São escolhas feitas uma vez, no começo, e que pesam no bolso por anos.
            </p>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {lp.mistakes.map((item) => (
                <li key={item.title} className="rounded-2xl bg-branco p-6 md:p-8">
                  <h3 className="font-display text-2xl font-semibold leading-tight">{item.title}</h3>
                  <p className="mt-3 text-aco text-pretty">{item.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Container>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">Como a abertura acontece</h2>
            <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
              {lp.steps.map((step, i) => (
                <li key={step.title} className="border-t-4 border-marinho pt-6">
                  <span className="font-display text-sm font-semibold text-marinho">Passo {i + 1}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold leading-tight">{step.title}</h3>
                  <p className="mt-2 text-aco text-pretty">{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12">
              <WhatsAppButton label={lp.hero.cta} message={lp.whatsappMessage} />
            </div>
          </Container>
        </section>

        <section className="pb-20 md:pb-28">
          <Container className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl bg-nevoa p-8 md:p-12">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">O que está incluso</h2>
              {lp.included ? (
                <ul className="mt-6 space-y-3 text-lg">
                  {lp.included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6">
                  <Placeholder>lista do que a abertura inclui (estudo de regime, contrato, registro, CNPJ, inscrição no DF, licenças)</Placeholder>
                </p>
              )}
              <p className="mt-8 border-t border-ardosia/15 pt-6 text-lg">
                Honorário da abertura: {lp.fee ?? <Placeholder>valor</Placeholder>}
              </p>
            </div>

            <div className="rounded-3xl border border-nevoa p-8 md:p-12">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Taxa da Junta Comercial</h2>
              <p className="mt-3 text-aco">Valores oficiais da JUCIS-DF em 2026.</p>
              <dl className="mt-6 divide-y divide-nevoa border-y border-nevoa">
                {lp.juntaFees.map((fee) => (
                  <div key={fee.label} className="flex items-baseline justify-between gap-6 py-4">
                    <dt>{fee.label}</dt>
                    <dd className="font-display text-xl font-semibold whitespace-nowrap">{fee.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-aco text-pretty">
                A taxa é isenta quando o caso se enquadra no Agiliza Empresa em Minutos, da própria Junta. A consulta de
                viabilidade é gratuita.
              </p>
              {lp.draft && (
                <p className="mt-4">
                  <Placeholder>se a taxa da Junta entra no honorário ou é paga à parte</Placeholder>
                </p>
              )}
            </div>
          </Container>
        </section>

        {/* Filtro honesto: MEI se abre sozinho e de graça. Evita pagar clique de quem não vai fechar. */}
        <section className="pb-20 md:pb-28">
          <Container>
            <div className="grid gap-6 rounded-3xl rounded-bl-[72px] bg-marinho p-8 text-white md:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:rounded-bl-[160px]">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">Vai abrir MEI?</h2>
                <p className="mt-4 max-w-xl text-lg text-white/90 text-pretty">
                  O MEI se abre sozinho e de graça no Portal do Empreendedor. Se o seu caso cabe nele, comece por lá. A
                  gente entra quando a empresa precisa de contador, ou quando o MEI fica pequeno.
                </p>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3 lg:justify-end">
                <a
                  href="https://www.gov.br/empresas-e-negocios/pt-br/empreendedor/quero-ser-mei"
                  {...external}
                  className="font-medium underline decoration-white/40 decoration-2 underline-offset-4 hover:decoration-white"
                >
                  Abrir MEI no gov.br
                </a>
                <Link
                  href="/blog/quando-sair-do-mei"
                  className="font-medium underline decoration-white/40 decoration-2 underline-offset-4 hover:decoration-white"
                >
                  Quando o MEI deixa de valer a pena
                </Link>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-claro py-20 md:py-28">
          <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">
                Dúvidas de quem vai abrir
              </h2>
              <p className="mt-5 max-w-xs text-aco text-pretty">
                Quem cuida da abertura é a {site.name}, em Brasília desde {site.foundedYear}. CNPJ {site.cnpj}.
              </p>
              <p className="mt-4 text-sm">
                {lp.googleReviewsUrl ? (
                  <a href={lp.googleReviewsUrl} {...external} className="font-medium underline underline-offset-4">
                    Ver avaliações no Google
                  </a>
                ) : (
                  lp.draft && <Placeholder>link das avaliações no Google</Placeholder>
                )}
              </p>
            </div>
            <div className="divide-y divide-ardosia/15 border-y border-ardosia/15">
              {lp.faq.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold leading-snug md:text-2xl [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-ardosia/25 text-xl transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-aco text-pretty">{item.a}</p>
                  {item.pending && (
                    <p className="mt-3">
                      <Placeholder>{item.pending}</Placeholder>
                    </p>
                  )}
                </details>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-28">
          <Container>
            <div className="rounded-3xl rounded-tl-[72px] bg-nevoa px-8 py-14 md:rounded-tl-[160px] md:px-16 md:py-20">
              <h2 className="max-w-3xl font-display text-5xl font-bold leading-[1] tracking-tight text-balance md:text-7xl">
                {lp.closing.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-pretty">{lp.closing.text}</p>
              <div className="mt-10">
                <WhatsAppButton label={lp.hero.cta} message={lp.whatsappMessage} />
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="bg-ardosia text-white/80">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm">
          <p>
            {site.name} · {site.contact.city}, {site.contact.state} · CNPJ {site.cnpj}
          </p>
          <Link href="/" className="underline decoration-white/30 underline-offset-4 hover:text-white">
            Conhecer o escritório
          </Link>
        </Container>
      </footer>

      <MobileContactBar message={lp.whatsappMessage} />
    </div>
  );
}
