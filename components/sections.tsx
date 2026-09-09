import { site, whatsappUrl } from "@/site.config";
import { Container } from "@/components/container";

export function Hero() {
  return (
    <section className="border-b border-border bg-brand-soft">
      <Container className="grid gap-10 py-24 md:grid-cols-[1.2fr_1fr] md:items-center md:py-32">
        <div className="space-y-6">
          <p className="text-sm font-medium uppercase tracking-widest text-brand">
            {site.contact.region}
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
            {site.tagline}
          </h1>
          <p className="max-w-xl text-lg text-muted text-pretty">
            {site.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
            >
              {site.cta.primary}
            </a>
            <a
              href="#servicos"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-background"
            >
              {site.cta.secondary}
            </a>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-3 md:grid-cols-1">
          {site.highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-card border border-border bg-background p-5"
            >
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="mt-1 text-2xl font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-16 py-24">
      <Container className="space-y-12">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight">
            O que a gente faz
          </h2>
          <p className="text-muted text-pretty">
            Rotina contábil completa, entregue no prazo e explicada em português.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service) => (
            <article
              key={service.slug}
              className="rounded-card border border-border bg-card p-6 transition-colors hover:border-brand"
            >
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function About() {
  return (
    <section
      id="sobre"
      className="scroll-mt-16 border-y border-border bg-card py-24"
    >
      <Container className="grid gap-10 md:grid-cols-2">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Contador que devolve número, não só guia
        </h2>
        <div className="space-y-4 text-muted">
          {site.about.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CallToAction() {
  return (
    <section id="contato" className="scroll-mt-16 py-24">
      <Container className="rounded-card border border-border bg-brand-soft px-8 py-14 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance">
          {site.cta.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted text-pretty">
          {site.cta.support}
        </p>
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-brand px-7 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          {site.cta.primary}
        </a>
      </Container>
    </section>
  );
}
