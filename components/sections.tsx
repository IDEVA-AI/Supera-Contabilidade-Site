import Image from "next/image";
import Link from "next/link";
import { instagramUrl, site, whatsappUrl } from "@/site.config";
import { Container } from "@/components/container";
import { Azulejo } from "@/components/azulejo";
import { formatDate, getPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={cn(
        "size-6 shrink-0 transition-transform duration-200 group-hover:translate-x-1",
        className,
      )}
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Botão principal, igual em todo lugar em que a página pede a primeira mensagem.
export function WhatsAppButton({ label, message }: { label: string; message?: string }) {
  return (
    <a
      href={whatsappUrl(message)}
      {...external}
      className="group inline-flex items-center gap-3 rounded-full bg-marinho px-7 py-4 font-medium text-white transition-colors hover:bg-ardosia"
    >
      {label}
      <Arrow className="size-5" />
    </a>
  );
}

// Topo: a pergunta é a tese da página. Cada situação abre o WhatsApp com a
// mensagem pronta; a urgente vem separada. A linha de cima fica dentro do h1
// porque é ela que diz ao Google o que o escritório é e onde está.
export function Hero() {
  const { urgent, common } = site.situations;

  return (
    <section className="pt-10 pb-20 md:pt-16 md:pb-28">
      <Container className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        <div>
          <h1>
            <span className="block text-sm font-semibold text-marinho md:text-base">
              Contabilidade em {site.contact.city}, desde {site.foundedYear}
            </span>
            <span className="mt-4 block font-display text-6xl font-bold leading-[0.95] tracking-tight text-balance md:text-8xl">
              O que te trouxe aqui?
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-aco text-pretty">{site.heroIntro}</p>

          <a
            href={whatsappUrl(urgent.message)}
            {...external}
            className="group mt-10 flex items-center justify-between gap-6 rounded-2xl bg-marinho px-6 py-5 text-white transition-colors hover:bg-ardosia md:px-8 md:py-6"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-prata">
                Urgente
              </span>
              <span className="mt-1 block font-display text-2xl font-semibold leading-tight md:text-3xl">
                {urgent.label}
              </span>
              <span className="mt-1 block text-sm text-white/80 text-pretty">{urgent.detail}</span>
            </span>
            <Arrow />
          </a>

          <ul className="mt-4 divide-y divide-nevoa border-b border-nevoa">
            {common.map((item) => (
              <li key={item.label}>
                <a
                  href={whatsappUrl(item.message)}
                  {...external}
                  className="group flex items-center justify-between gap-6 px-1 py-5 transition-colors hover:text-marinho"
                >
                  <span>
                    <span className="block font-display text-2xl font-semibold leading-tight md:text-3xl">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-aco text-pretty">{item.detail}</span>
                  </span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl()}
            {...external}
            className="mt-6 inline-block text-sm font-medium underline decoration-nevoa decoration-2 underline-offset-4 transition-colors hover:decoration-marinho"
          >
            Nenhum desses? Conta pra gente o que é
          </a>
        </div>

        <aside className="flex flex-col overflow-hidden rounded-3xl rounded-tr-[72px] bg-marinho text-white lg:min-h-[460px] lg:rounded-tr-[160px]">
          <Azulejo id="azulejo-topo" className="h-24 text-prata lg:h-auto lg:min-h-48 lg:flex-1" />
          <div className="p-8 md:p-10">
            <p className="text-sm font-medium text-white/75">Quem te atende</p>
            <p className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
              Paulo e Danilo
            </p>
            <p className="mt-3 max-w-xs text-lg leading-snug text-white/90 text-pretty">
              Você fala direto com quem cuida da sua empresa, sem central de atendimento.
            </p>
            <p className="mt-6 border-t border-white/20 pt-4 text-sm text-white/75">
              CNPJ {site.cnpj}, aberto em {site.foundedYear}
            </p>
          </div>
        </aside>
      </Container>
    </section>
  );
}

// Cada serviço abre o WhatsApp perguntando dele. A seta é o mesmo sinal do topo:
// onde tem seta, a conversa começa.
export function Services() {
  return (
    <section id="servicos" className="scroll-mt-20 bg-claro py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
            O que a gente faz
          </h2>
          <p className="mt-5 max-w-sm text-aco text-pretty">
            A rotina de uma empresa pequena ou média, do CNPJ à folha. Se o seu caso
            não está na lista, pergunta mesmo assim.
          </p>
        </div>

        <ul className="divide-y divide-ardosia/15 border-y border-ardosia/15">
          {site.services.map((service) => (
            <li key={service.title}>
              <a
                href={whatsappUrl(`Olá! Quero saber sobre ${service.title.toLowerCase()}.`)}
                {...external}
                className="group grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-6 md:grid-cols-[1.15fr_1.25fr_auto] md:gap-x-6"
              >
                <h3 className="font-display text-2xl font-semibold leading-tight transition-colors group-hover:text-marinho">
                  {service.title}
                </h3>
                <Arrow className="mt-0.5 size-5 text-aco group-hover:text-marinho md:order-last" />
                <p className="col-span-2 text-aco text-pretty md:col-span-1">
                  {service.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Steps() {
  return (
    <section id="como-comeca" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <h2 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
          Como começa
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {site.steps.map((step, i) => (
            <li key={step.title} className="border-t-4 border-marinho pt-6">
              <span className="font-display text-sm font-semibold text-marinho">
                Passo {i + 1}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-aco text-pretty">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <WhatsAppButton label="Mandar a primeira mensagem" />
        </div>
      </Container>
    </section>
  );
}

export function About() {
  return (
    <section id="quem-somos" className="scroll-mt-20 pb-20 md:pb-28">
      <Container>
        <div className="grid overflow-hidden rounded-3xl rounded-bl-[72px] bg-marinho text-white lg:grid-cols-2 lg:rounded-bl-[160px]">
          <div className="p-8 md:p-14">
            <p className="text-sm font-medium text-white/75">Quem somos</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-balance md:text-5xl">
              Cuidando de empresas em Brasília desde {site.foundedYear}
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/90">
              {site.about.map((paragraph) => (
                <p key={paragraph} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
            <ul className="mt-10 grid gap-6 border-t border-white/20 pt-8 sm:grid-cols-2">
              {site.founders.map((person) => (
                <li key={person.name}>
                  <p className="font-display text-xl font-semibold">{person.name}</p>
                  <p className="mt-1 text-sm text-white/75">{person.role}</p>
                </li>
              ))}
            </ul>
            {instagramUrl && (
              <a
                href={instagramUrl}
                {...external}
                className="mt-8 inline-block text-sm text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                No Instagram: @{instagramUrl.split("/").filter(Boolean).pop()}
              </a>
            )}
          </div>

          <div className="relative h-40 bg-azul lg:h-auto lg:min-h-72">
            {site.aboutPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.aboutPhoto}
                alt={`${site.founders.map((p) => p.name).join(" e ")} no escritório`}
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              // Tom sobre tom: o azulejo em força total fica só no topo, que é a assinatura.
              <Azulejo id="azulejo-sobre" size={128} className="absolute inset-0 text-marinho" />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

// Só aparece com avaliação real cadastrada no config.
export function Reviews() {
  if (!site.reviews.length) return null;

  return (
    <section id="avaliacoes" className="scroll-mt-20 pb-20 md:pb-28">
      <Container>
        <h2 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
          O que dizem no Google
        </h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {site.reviews.map((review) => (
            <li key={review.name} className="rounded-2xl border border-nevoa bg-white p-6">
              <p className="text-pretty">{review.text}</p>
              <p className="mt-4 text-sm text-aco">
                {review.name}, {review.when}
              </p>
            </li>
          ))}
        </ul>
        {site.googleProfileUrl && (
          <a
            href={site.googleProfileUrl}
            {...external}
            className="mt-8 inline-block font-medium underline underline-offset-4"
          >
            Ver todas as avaliações no Google
          </a>
        )}
      </Container>
    </section>
  );
}

// As perguntas também saem como FAQPage no JSON-LD, que o Google pode mostrar na busca.
export function Faq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: site.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="duvidas" className="scroll-mt-20 bg-claro py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
            Dúvidas comuns
          </h2>
          <p className="mt-5 max-w-xs text-aco text-pretty">
            Não achou a sua?{" "}
            <a
              href={whatsappUrl("Olá! Tenho uma dúvida.")}
              {...external}
              className="font-medium text-ardosia underline decoration-prata decoration-2 underline-offset-4 transition-colors hover:decoration-marinho"
            >
              Pergunta no WhatsApp
            </a>
            .
          </p>
        </div>
        <div className="divide-y divide-ardosia/15 border-y border-ardosia/15">
          {site.faq.map((item) => (
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
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function BlogPreview() {
  const posts = getPosts().slice(0, 3);
  if (!posts.length) return null;

  return (
    <section id="blog" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-6xl">
            Pra ler com calma
          </h2>
          <Link
            href="/blog"
            className="font-medium underline decoration-nevoa decoration-2 underline-offset-4 hover:decoration-marinho"
          >
            Ver todos os artigos
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-nevoa bg-white p-3 pb-6 transition-colors hover:border-marinho"
              >
                {post.cover && (
                  <Image
                    src={post.cover}
                    alt=""
                    width={1200}
                    height={800}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="aspect-[3/2] w-full rounded-xl object-cover"
                  />
                )}
                <span className="mt-5 flex items-center gap-3 px-3 text-sm text-aco">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingMinutes} min de leitura</span>
                  {post.status === "rascunho" && (
                    <span className="rounded-full bg-prata px-2 py-0.5 text-xs font-semibold text-ardosia">
                      Rascunho
                    </span>
                  )}
                </span>
                <h3 className="mt-3 px-3 font-display text-2xl font-semibold leading-tight text-balance group-hover:text-marinho">
                  {post.title}
                </h3>
                <p className="mt-3 px-3 text-aco text-pretty">{post.description}</p>
                {/* Sem seta de propósito: no site, seta é o sinal de que abre o WhatsApp. */}
                <span className="mx-3 mt-auto w-fit pt-6 text-sm font-medium underline decoration-nevoa decoration-2 underline-offset-4 transition-colors group-hover:decoration-marinho">
                  Ler o artigo
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// Fechamento: quem desceu até aqui ganha de novo os atalhos do topo, sem precisar subir.
export function CallToAction() {
  const { urgent, common } = site.situations;

  return (
    <section id="contato" className="scroll-mt-20 pb-24 md:pb-32">
      <Container>
        <div className="grid gap-12 rounded-3xl rounded-tl-[72px] bg-nevoa px-8 py-14 md:rounded-tl-[160px] md:px-16 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h2 className="max-w-3xl font-display text-5xl font-bold leading-[1] tracking-tight text-balance md:text-7xl">
              {site.cta.headline}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-pretty">{site.cta.support}</p>
            <div className="mt-10">
              <WhatsAppButton label={site.cta.primary} />
            </div>
            {site.contact.hours && <p className="mt-4 text-sm">{site.contact.hours}</p>}
          </div>

          <div>
            <p className="text-sm font-semibold text-marinho">Ou vai direto no assunto</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {[urgent, ...common].map((item) => (
                <li key={item.short}>
                  <a
                    href={whatsappUrl(item.message)}
                    {...external}
                    className="inline-flex rounded-full border border-ardosia/20 bg-branco px-4 py-2.5 text-sm font-medium transition-colors hover:border-marinho hover:text-marinho"
                  >
                    {item.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
