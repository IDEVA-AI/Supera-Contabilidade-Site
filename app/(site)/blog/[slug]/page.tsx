import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { FaqList } from "@/components/sections";
import { formatDate, getHeadings, getPost, getPosts, getRelated, lastModified, slugify } from "@/lib/blog";
import { faqSchema, jsonLd } from "@/lib/schema";
import { site, siteUrl, whatsappUrl } from "@/site.config";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: site.name,
      url: `/blog/${slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: lastModified(post),
      // Definir openGraph aqui apaga a imagem herdada do app/opengraph-image.png, por
      // isso o artigo sem prévia própria cai na capa e, sem capa, na imagem do site.
      images: post.ogImage
        ? [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }]
        : [{ url: post.cover ?? "/opengraph-image.png", alt: post.coverAlt ?? site.name }],
    },
    twitter: post.ogImage ? { card: "summary_large_image", images: [post.ogImage] } : undefined,
    robots: post.status === "rascunho" ? { index: false, follow: false } : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${siteUrl}/blog/${slug}`;
  const organization = {
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}/img/logo/supera-horizontal.png` },
  };
  // Enquanto quem assina é o escritório, o autor é a organização. Quando o artigo
  // trouxer o nome de uma pessoa no `author`, ele vira Person.
  const author =
    post.author === site.name
      ? { "@type": "Organization", name: site.name, url: siteUrl }
      : { "@type": "Person", name: post.author };
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: lastModified(post),
    author,
    publisher: organization,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "pt-BR",
    image: post.cover ? `${siteUrl}${post.cover}` : undefined,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };
  // Só mostra a revisão quando ela é de outro dia que a publicação.
  const updated = post.updated !== post.date ? post.updated : undefined;
  const headings = getHeadings(post.body);
  const related = getRelated(slug);

  return (
    <article className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }}
      />
      {post.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema(post.faq)) }}
        />
      )}
      <Container>
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Você está em" className="text-sm text-aco">
            <ol className="flex min-w-0 items-center gap-2">
              <li className="shrink-0">
                <Link href="/" className="underline-offset-4 hover:text-marinho hover:underline">
                  Início
                </Link>
              </li>
              <li aria-hidden="true" className="shrink-0 text-prata">/</li>
              <li className="shrink-0">
                <Link href="/blog" className="underline-offset-4 hover:text-marinho hover:underline">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="shrink-0 text-prata">/</li>
              <li aria-current="page" className="min-w-0 truncate">
                {post.title}
              </li>
            </ol>
          </nav>
          {post.status === "rascunho" && (
            <p className="mt-6 w-fit rounded-full bg-prata px-3 py-1 text-xs font-semibold">
              Rascunho, não vai ao ar
            </p>
          )}
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-aco text-pretty">{post.description}</p>
          <p className="mt-6 text-sm text-aco">
            {post.author}, <time dateTime={post.date}>{formatDate(post.date)}</time>.{" "}
            {updated && (
              <>
                Atualizado em <time dateTime={updated}>{formatDate(updated)}</time>.{" "}
              </>
            )}
            {post.readingMinutes} min de leitura.
          </p>

          {/* Resposta curta: a pergunta do título respondida antes de tudo, em texto
              corrido. É o trecho que o Google e as IAs citam quando citam o artigo. */}
          {post.answer && (
            <section
              aria-label="Resposta curta"
              className="mt-10 rounded-2xl border-l-4 border-marinho bg-claro p-6 md:p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-aco">
                Resposta curta
              </p>
              <p className="mt-2 text-lg leading-relaxed text-ardosia text-pretty">{post.answer}</p>
            </section>
          )}

          {post.cover && (
            <Image
              src={post.cover}
              alt={post.coverAlt ?? ""}
              width={1600}
              height={1067}
              priority
              sizes="(min-width: 768px) 48rem, 100vw"
              className="mt-10 aspect-[3/2] w-full rounded-3xl rounded-tr-[96px] object-cover"
            />
          )}

          {headings.length > 2 && (
            <nav aria-label="Neste artigo" className="mt-10 rounded-2xl bg-claro p-6 md:p-8">
              <p className="text-sm font-semibold text-marinho">Neste artigo</p>
              <ol className="mt-3 space-y-2">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="text-ardosia underline decoration-nevoa decoration-2 underline-offset-4 transition-colors hover:decoration-marinho"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div className="artigo mt-12">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 id={slugify(String(children))}>{children}</h2>
                ),
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>

          {post.faq && (
            <section className="mt-16">
              <h2 className="font-display text-3xl font-bold tracking-tight text-marinho">
                Perguntas frequentes
              </h2>
              <div className="mt-6">
                <FaqList items={post.faq} />
              </div>
            </section>
          )}

          {/* Assinatura. Artigo de contabilidade sem gente por trás lê como texto de
              robô, e é quem assina que responde pelo número publicado. */}
          <aside className="mt-16 flex flex-col gap-5 rounded-2xl border border-nevoa p-6 sm:flex-row sm:items-center md:p-8">
            {site.author.photo && (
              <Image
                src={site.author.photo}
                alt={site.author.photoAlt}
                width={160}
                height={160}
                className="size-20 shrink-0 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-aco">
                Quem escreve
              </p>
              <p className="mt-1 font-display text-xl font-semibold">{site.author.name}</p>
              <p className="mt-0.5 text-sm text-aco">{site.author.role}</p>
              <p className="mt-3 text-pretty">{site.author.text}</p>
            </div>
          </aside>

          <aside className="mt-16 rounded-3xl rounded-tr-[120px] bg-marinho p-8 text-white md:p-12">
            <p className="font-display text-3xl font-bold leading-tight">
              Esse é o seu caso?
            </p>
            <p className="mt-3 max-w-lg text-white/85 text-pretty">
              Conta o que está acontecendo no WhatsApp.
            </p>
            <a
              href={whatsappUrl(`Olá! Li o artigo "${post.title}" e quero conversar.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex rounded-full bg-prata px-6 py-3 font-medium text-ardosia"
            >
              {site.cta.primary}
            </a>
          </aside>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-semibold">Continue lendo</h2>
              <ul className="mt-6 divide-y divide-nevoa border-y border-nevoa">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blog/${item.slug}`} className="group block py-5">
                      <span className="font-display text-xl font-semibold leading-snug text-balance transition-colors group-hover:text-marinho">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm text-aco">
                        {item.readingMinutes} min de leitura
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </Container>
    </article>
  );
}
