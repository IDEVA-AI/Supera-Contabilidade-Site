import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// Blog em arquivos: um .md por artigo em content/blog. Publicar é criar o
// arquivo com status "publicado". Miolo simplificado do motor do martinek-adv.

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  author: string;
  status: "rascunho" | "publicado";
  body: string;
  readingMinutes: number;
  cover?: string; // caminho em /public, ex: /img/blog/slug.jpg
  coverAlt?: string;
  ogImage?: string; // 1200x630 com o título, pra prévia do link
  updated?: string; // YYYY-MM-DD da última revisão
  answer?: string; // resposta direta de 40 a 60 palavras, pro topo do artigo
  faq?: FaqItem[]; // perguntas do fim do artigo, viram também JSON-LD FAQPage
}

export interface FaqItem {
  q: string;
  a: string;
}

// Rascunho aparece no `pnpm dev` pra revisar e nunca entra no build de produção.
const showDrafts = process.env.NODE_ENV !== "production";

function toDateStr(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

// Lista de perguntas do frontmatter. Item sem pergunta ou sem resposta é ignorado
// em vez de quebrar o build: frontmatter é escrito à mão.
function toFaq(value: unknown): FaqItem[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .filter((item): item is { q: unknown; a: unknown } => typeof item === "object" && item !== null)
    .map((item) => ({ q: String(item.q ?? "").trim(), a: String(item.a ?? "").trim() }))
    .filter((item) => item.q && item.a);
  return items.length ? items : undefined;
}

function loadAll(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: String(data.title),
        description: String(data.description ?? ""),
        date: toDateStr(data.date),
        author: String(data.author ?? "Supera Contabilidade"),
        status: data.status === "publicado" ? "publicado" : "rascunho",
        body: content.trim(),
        readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
        cover: data.cover ? String(data.cover) : undefined,
        coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
        ogImage: data.ogImage ? String(data.ogImage) : undefined,
        updated: data.updated ? toDateStr(data.updated) : undefined,
        answer: data.answer ? String(data.answer).trim() : undefined,
        faq: toFaq(data.faq),
      } satisfies Post;
    });
}

export function getPosts(): Post[] {
  return loadAll()
    .filter((post) => showDrafts || post.status === "publicado")
    // Mesma data desempata pelo slug, pra ordem não depender do sistema de arquivos.
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

// Data da última mudança do artigo: a revisão, se houver, senão a publicação.
export function lastModified(post: Post): string {
  return post.updated ?? post.date;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

// "Continue lendo": os artigos que vêm logo depois deste na lista (mais velhos),
// voltando ao começo quando acaba. Assim cada artigo aponta pra vizinhos diferentes
// e nenhum fica sem link de entrada, mesmo com todos na mesma data.
export function getRelated(slug: string, limit = 2): Post[] {
  const posts = getPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return posts
    .slice(index + 1)
    .concat(posts.slice(0, Math.max(index, 0)))
    .slice(0, limit);
}

// Âncora de um intertítulo: "Quanto tempo leva?" vira "quanto-tempo-leva".
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Intertítulos (##) do artigo, na ordem, pro índice "Neste artigo".
export function getHeadings(body: string): { id: string; text: string }[] {
  return [...body.matchAll(/^## (.+)$/gm)].map(([, text]) => ({
    id: slugify(text.trim()),
    text: text.trim(),
  }));
}

export function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
