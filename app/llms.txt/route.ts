import { getPosts } from "@/lib/blog";
import { site, siteUrl, whatsappUrl } from "@/site.config";

// /llms.txt no formato de llmstxt.org: o resumo do site pra IA generativa ler e citar.
// Sai dos mesmos dados do site (config e artigos), gerado no build. Nunca escrever à mão.
// Vínculo geográfico é Brasília/DF, como no resto do site.
export const dynamic = "force-static";

export function GET() {
  const posts = getPosts().filter((post) => post.status === "publicado");

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} é um escritório de contabilidade em ${site.contact.city}, ${site.contact.region}. O primeiro contato é pelo WhatsApp: ${whatsappUrl()}`,
    "",
    "Serviços:",
    "",
    ...site.services.map((service) => `- ${service.title}: ${service.description}`),
    "",
    "## Páginas",
    "",
    `- [Início](${siteUrl}): quem somos, serviços, como começa e perguntas frequentes.`,
    `- [Blog](${siteUrl}/blog): artigos sobre contabilidade para empresas no Distrito Federal.`,
    "",
    "## Artigos",
    "",
    ...posts.map((post) => `- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.description}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
