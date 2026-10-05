import type { MetadataRoute } from "next";
import { siteUrl } from "@/site.config";
import { getPosts, lastModified } from "@/lib/blog";
import { lp } from "@/content/lp-abrir-empresa";

export default function sitemap(): MetadataRoute.Sitemap {
  const all = getPosts();
  const posts = all.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(lastModified(post)),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  // Home e lista do blog mudam quando entra ou muda artigo, então levam a data do
  // artigo mais recente, não a hora do build (que diria ao Google que tudo mudou).
  const newest = all.map(lastModified).sort().at(-1);
  const siteModified = newest ? new Date(newest) : undefined;

  return [
    { url: siteUrl, lastModified: siteModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: siteModified, changeFrequency: "weekly", priority: 0.7 },
    ...posts,
    // A landing page só entra quando sair do rascunho.
    ...(lp.draft
      ? []
      : [{ url: `${siteUrl}${lp.path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }]),
  ];
}
