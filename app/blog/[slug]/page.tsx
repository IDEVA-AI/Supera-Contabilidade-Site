import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/container";
import { formatDate, getPost, getPosts } from "@/lib/blog";
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
    robots: post.status === "rascunho" ? { index: false, follow: false } : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
  };

  return (
    <article className="py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="text-sm text-aco hover:text-marinho">
            Blog
          </Link>
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
            {post.author}, <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>

          <div className="artigo mt-12">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
          </div>

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
        </div>
      </Container>
    </article>
  );
}
