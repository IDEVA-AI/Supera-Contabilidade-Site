import Link from "next/link";
import { site, whatsappUrl } from "@/site.config";
import { Container } from "@/components/container";
import { Azulejo } from "@/components/azulejo";
import { formatDate, getPosts } from "@/lib/blog";
import { cn } from "@/lib/utils";

function Arrow({ className }: { className?: string }) {
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

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Topo: a pergunta é a tese da página. Cada situação abre o WhatsApp com a
// mensagem pronta; a urgente vem separada em amarelo.
export function Hero() {
  const { urgent, common } = site.situations;

  return (
    <section className="pt-10 pb-20 md:pt-16 md:pb-28">
      <Container className="grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-16">
        <div>
          <p className="text-sm font-medium text-tinta-suave">
            Contabilidade em {site.contact.city}, {site.contact.state}. Desde{" "}
            {site.foundedYear}.
          </p>
          <h1 className="mt-4 font-display text-6xl font-bold leading-[0.95] tracking-tight text-balance md:text-8xl">
            O que te trouxe aqui?
          </h1>
          <p className="mt-6 max-w-lg text-lg text-tinta-suave text-pretty">
            Escolha o que aconteceu. A conversa começa no WhatsApp com a mensagem
            já escrita.
          </p>

          <a
            href={whatsappUrl(urgent.message)}
            {...external}
            className="group mt-10 flex items-center justify-between gap-6 rounded-2xl bg-ipe px-6 py-5 md:px-8 md:py-6"
          >
            <span>
              <span className="block text-xs font-semibold uppercase tracking-wider">
                Urgente
              </span>
              <span className="mt-1 block font-display text-2xl font-semibold leading-tight md:text-3xl">
                {urgent.label}
              </span>
              <span className="mt-1 block text-sm text-tinta/75">{urgent.detail}</span>
            </span>
            <Arrow />
          </a>

          <ul className="mt-4 divide-y divide-fio border-b border-fio">
            {common.map((item) => (
              <li key={item.label}>
                <a
                  href={whatsappUrl(item.message)}
                  {...external}
                  className="group flex items-center justify-between gap-6 px-1 py-5 transition-colors hover:text-azulejo"
                >
                  <span>
                    <span className="block font-display text-2xl font-semibold leading-tight md:text-3xl">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-tinta-suave">
                      {item.detail}
                    </span>
                  </span>
                  <Arrow />
                </a>
              </li>
            ))}
          </ul>

          <a
            href={whatsappUrl()}
            {...external}
            className="mt-6 inline-block text-sm font-medium underline decoration-fio decoration-2 underline-offset-4 transition-colors hover:decoration-azulejo"
          >
            Nenhum desses? Conta pra gente o que é
          </a>
        </div>

        <aside className="flex min-h-[460px] flex-col overflow-hidden rounded-3xl rounded-tr-[96px] bg-azulejo text-white lg:rounded-tr-[160px]">
          <Azulejo id="azulejo-topo" className="min-h-48 flex-1 text-white" />
          <div className="p-8 md:p-10">
            <p className="text-sm font-medium text-white/75">Quem te atende</p>
            <p className="mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
              Paulo e Danilo
            </p>
            <p className="mt-3 max-w-xs text-lg leading-snug text-white/90">
              Pai e filho à frente de um escritório aberto em {site.foundedYear}.
            </p>
          </div>
        </aside>
      </Container>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicos" className="scroll-mt-20 bg-concreto py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
            O que a gente faz
          </h2>
          <p className="mt-5 max-w-sm text-tinta-suave text-pretty">
            A rotina contábil de uma empresa pequena ou média. Se o seu caso não
            está aqui, pergunta mesmo assim.
          </p>
        </div>

        <ul className="divide-y divide-tinta/15 border-y border-tinta/15">
          {site.services.map((service) => (
            <li
              key={service.title}
              className="grid gap-2 py-6 md:grid-cols-[1fr_1.3fr] md:gap-8"
            >
              <h3 className="font-display text-2xl font-semibold leading-tight">
                {service.title}
              </h3>
              <p className="text-tinta-suave text-pretty">{service.description}</p>
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
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {site.steps.map((step, i) => (
            <li key={step.title} className="border-t-4 border-azulejo pt-6">
              <span className="font-display text-sm font-semibold text-azulejo">
                Passo {i + 1}
              </span>
              <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-tinta-suave text-pretty">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function About() {
  return (
    <section id="quem-somos" className="scroll-mt-20 pb-20 md:pb-28">
      <Container>
        <div className="grid overflow-hidden rounded-3xl rounded-bl-[96px] bg-azulejo text-white lg:grid-cols-2 lg:rounded-bl-[160px]">
          <div className="p-8 md:p-14">
            <p className="text-sm font-medium text-white/75">Quem somos</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-balance md:text-5xl">
              Um escritório de família em Brasília
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
          </div>

          <div className="relative min-h-72 bg-azulejo-escuro">
            {site.aboutPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={site.aboutPhoto}
                alt={`${site.founders.map((p) => p.name).join(" e ")} no escritório`}
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              // Tom sobre tom: o azulejo em força total fica só no topo, que é a assinatura.
              <Azulejo id="azulejo-sobre" size={128} className="absolute inset-0 text-azulejo" />
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
            <li key={review.name} className="rounded-2xl border border-fio bg-white p-6">
              <p className="text-pretty">{review.text}</p>
              <p className="mt-4 text-sm text-tinta-suave">
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

export function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-20 bg-concreto py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <h2 className="font-display text-5xl font-bold tracking-tight text-balance md:text-6xl">
          Dúvidas comuns
        </h2>
        <div className="divide-y divide-tinta/15 border-y border-tinta/15">
          {site.faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-xl font-semibold leading-snug md:text-2xl [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-tinta/25 text-xl transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-tinta-suave text-pretty">{item.a}</p>
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
            className="font-medium underline decoration-fio decoration-2 underline-offset-4 hover:decoration-azulejo"
          >
            Ver todos os artigos
          </Link>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-fio bg-white p-6 transition-colors hover:border-azulejo"
              >
                <span className="flex items-center gap-3 text-sm text-tinta-suave">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.status === "rascunho" && (
                    <span className="rounded-full bg-ipe px-2 py-0.5 text-xs font-semibold text-tinta">
                      Rascunho
                    </span>
                  )}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-balance group-hover:text-azulejo">
                  {post.title}
                </h3>
                <p className="mt-3 text-tinta-suave text-pretty">{post.description}</p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-medium">
                  Ler artigo <Arrow className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function CallToAction() {
  return (
    <section id="contato" className="scroll-mt-20 pb-24 md:pb-32">
      <Container>
        <div className="rounded-3xl rounded-tl-[72px] bg-ipe px-8 py-14 md:rounded-tl-[160px] md:px-16 md:py-20">
          <h2 className="max-w-3xl font-display text-5xl font-bold leading-[1] tracking-tight text-balance md:text-7xl">
            {site.cta.headline}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-pretty">{site.cta.support}</p>
          <a
            href={whatsappUrl()}
            {...external}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-tinta px-7 py-4 font-medium text-white"
          >
            {site.cta.primary}
            <Arrow className="size-5" />
          </a>
          <p className="mt-4 text-sm">{site.contact.hours}</p>
        </div>
      </Container>
    </section>
  );
}
