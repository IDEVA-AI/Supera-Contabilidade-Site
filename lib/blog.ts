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
}

// Rascunho aparece no `pnpm dev` pra revisar e nunca entra no build de produção.
const showDrafts = process.env.NODE_ENV !== "production";

function toDateStr(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
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
      } satisfies Post;
    });
}

export function getPosts(): Post[] {
  return loadAll()
    .filter((post) => showDrafts || post.status === "publicado")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
