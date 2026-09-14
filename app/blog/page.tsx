import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { formatDate, getPosts } from "@/lib/blog";

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
      <p className="mt-5 max-w-xl text-lg text-tinta-suave text-pretty">
        Explicações curtas sobre o que costuma aparecer na vida de quem tem empresa
        no Distrito Federal.
      </p>

      {posts.length ? (
        <ul className="mt-14 divide-y divide-fio border-y border-fio">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 py-8 md:grid-cols-[12rem_1fr] md:gap-8"
              >
                <time dateTime={post.date} className="text-sm text-tinta-suave md:pt-2">
                  {formatDate(post.date)}
                </time>
                <div>
                  <h2 className="font-display text-2xl font-semibold leading-tight text-balance transition-colors group-hover:text-azulejo md:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-tinta-suave text-pretty">
                    {post.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-14 text-tinta-suave">Os primeiros artigos estão sendo escritos.</p>
      )}
    </Container>
  );
}
