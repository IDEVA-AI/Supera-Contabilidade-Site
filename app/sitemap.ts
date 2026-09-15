import type { MetadataRoute } from "next";
import { siteUrl } from "@/site.config";
import { getPosts } from "@/lib/blog";
import { lp } from "@/content/lp-abrir-empresa";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...posts,
    // A landing page só entra quando sair do rascunho.
    ...(lp.draft
      ? []
      : [{ url: `${siteUrl}${lp.path}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }]),
  ];
}
