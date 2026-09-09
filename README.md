# Supera Contabilidade — site

Base do site institucional da Supera Contabilidade. Next.js 16 (App Router) +
React 19 + Tailwind CSS 4 + TypeScript, estático por padrão.

## Rodar

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # build de produção
pnpm lint
```

## Como este site é dirigido

Nome, contato, WhatsApp, serviços, provas e textos da home saem todos de
`site.config.ts`. Trocar lá muda o site inteiro: layout, metadata, JSON-LD,
seções e rodapé. Nenhum telefone ou e-mail cravado dentro de componente.

Os valores marcados com `[PLACEHOLDER]` são exemplo e precisam ser confirmados
com o cliente antes de publicar (o JSON-LD depende deles).

## Estrutura

```
app/            rotas (home, sitemap, robots), layout e globals.css
components/     header, footer, container e as seções da home
lib/            schema JSON-LD e utilitários
public/img/     imagens da marca
site.config.ts  fonte única de verdade do conteúdo e do contato
```

## Cor e tipografia

Os tokens ficam no topo de `app/globals.css` (claro e escuro). A cor da marca é
`--brand`; trocar ali propaga por botões, links e destaques. Fonte: Inter via
`next/font`.

## Deploy

Vercel, sem configuração extra. Definir `NEXT_PUBLIC_SITE_URL` com o domínio
final (ver `.env.example`), senão metadata e sitemap saem com a URL de exemplo.
