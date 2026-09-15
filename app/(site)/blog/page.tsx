import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { formatDate, getPosts } from "@/lib/blog";
import { whatsappUrl } from "@/site.config";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos da Supera Contabilidade pra quem tem empresa no Distrito Federal: abertura de empresa, troca de contador, impostos e rotina contábil.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <Container className="py-16 md:py-24">
      <h1 className="font-display text-6xl font-bold tracking-tight md:text-8xl">Blog</h1>
      <p className="mt-5 max-w-xl text-lg text-aco text-pretty">
        Explicações curtas sobre o que costuma aparecer na vida de quem tem empresa
        no Distrito Federal.
      </p>

      {posts.length ? (
        <ul className="mt-14 divide-y divide-nevoa border-y border-nevoa">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-5 py-8 md:grid-cols-[18rem_1fr] md:items-center md:gap-10"
              >
                {post.cover ? (
                  <Image
                    src={post.cover}
                    alt=""
                    width={1200}
                    height={800}
                    sizes="(min-width: 768px) 18rem, 100vw"
                    className="aspect-[3/2] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <span aria-hidden="true" />
                )}
                <div>
                  <p className="mb-3 text-sm text-aco">
                    <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min de leitura
                  </p>
                  <h2 className="font-display text-2xl font-semibold leading-tight text-balance transition-colors group-hover:text-marinho md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-aco text-pretty">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-14 text-aco">Os primeiros artigos estão sendo escritos.</p>
      )}

      <p className="mt-12 text-aco text-pretty">
        Tem uma dúvida que ainda não virou artigo?{" "}
        <a
          href={whatsappUrl("Olá! Tenho uma dúvida que não achei no blog.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ardosia underline decoration-prata decoration-2 underline-offset-4 transition-colors hover:decoration-marinho"
        >
          Pergunta no WhatsApp
        </a>
        .
      </p>
    </Container>
  );
}
