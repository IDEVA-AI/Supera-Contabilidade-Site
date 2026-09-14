# CLAUDE.md — supera-contabilidade-site

## 1. O que é

Site institucional da Supera Contabilidade (Brasília-DF), cliente da IDEVA.
Next.js 16 App Router, React 19, Tailwind 4, TypeScript, tudo estático. Primeira
versão da home e do blog de pé desde 2026-09-14. Boa parte do texto ainda é
rascunho da IDEVA a validar com o Danilo, e o WhatsApp é falso: **não publicar**
até trocar. Estado do cliente em
`~/projetos/cerebro-operacional/interno/clientes/Supera/_estado.md`.

Direção visual (aprovada pelo Julio em 2026-09-14): linha do Hoskens Accountancy,
cor chapada e tipografia com personalidade, funcionando sem foto. As cores são as
da marca, medidas no logo e nos posts do Instagram `@supera.contabilidade` em
2026-09-14 (marinho, prata e aço, sem cor quente). Não inventar cor fora dessa lista. Referências de
nível mundial e prints das versões em `interno/clientes/Supera/referencias-site/`
e `interno/clientes/Supera/site-v1/`.

## 2. Mapa interno

- `site.config.ts` · fonte única de nome, contato, situações do topo, serviços,
  passos, sócios, avaliações, perguntas frequentes e chamadas. `[PLACEHOLDER]` =
  dado não confirmado pelo cliente; `[VALIDAR]` = texto da IDEVA que o Danilo
  precisa ler.
- `app/layout.tsx` · metadata, fontes (Gabarito nos títulos, Hanken Grotesk no
  texto), JSON-LD, header, footer e a barra fixa do celular.
- `app/page.tsx` · a home, na ordem: topo com seletor de situação, serviços, como
  começa, quem somos, avaliações, dúvidas, blog, fechamento.
- `app/globals.css` · tokens com as cores medidas da marca (marinho, azul, ardósia,
  aço, prata, névoa, claro, branco) e o estilo do corpo de artigo (`.artigo`). Só
  tema claro.
- `components/sections.tsx` · todas as seções da home. `Reviews` e `BlogPreview`
  somem sozinhas quando não há dado.
- `components/azulejo.tsx` · o padrão de azulejo, assinatura visual do site.
- `components/site-header.tsx`, `components/site-footer.tsx`,
  `components/mobile-contact-bar.tsx`, `components/container.tsx`
- `lib/blog.ts` · lê `content/blog/*.md` (gray-matter). Artigo com
  `status: rascunho` aparece no `dev` e nunca no build de produção.
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` · lista e artigo (react-markdown
  + remark-gfm, JSON-LD `BlogPosting`, chamada de WhatsApp no fim).
- `content/blog/` · os artigos. Hoje 3 rascunhos só com a estrutura.
- `app/sitemap.ts`, `app/robots.ts` · SEO técnico; o sitemap inclui só artigo publicado.
- `lib/schema.ts` · JSON-LD `AccountingService`; só emite campo preenchido.
- `lib/utils.ts` · `cn()` para juntar classes (não resolve conflito de classe).
- `public/img/` · imagens da marca (vazio até vir material).
- `.env.example` · `NEXT_PUBLIC_SITE_URL`, o domínio final.

## 3. Vizinhos

- `~/projetos/martinek-adv/` · origem do motor de artigos. Daqui só veio o miolo;
  pilar/satélite, capa gerada e página de aprovação ficaram de fora e são o que
  copiar quando o ritmo semanal de artigos começar.
- `~/projetos/ideva-site/` · site da IDEVA, mesma stack e mesmas versões.
- `~/CLAUDE.md` · a porta da home do Mac.
- `github.com/IDEVA-AI/Supera-Contabilidade-Site` [externo: GitHub] · o remoto.
  O domínio `superacontabilidade.com.br` já aponta pra Vercel, e o push pode
  publicar. Não empurrar sem ok do Julio.

## 4. Skills

- `ideva-dev` · antes de escrever ou alterar qualquer código aqui.
- `frontend-design` · antes de mexer no visual.
- `brain` · quando o trabalho tocar servidor, deploy ou contexto do cliente.

## 5. O que não fazer

**Não crave contato, nome ou texto dentro de componente.** Tudo passa por
`site.config.ts`, senão diverge (já aconteceu no martinek-adv: o @ do Instagram
saiu errado nas artes por estar escrito em dois lugares).

**Não publique com `[PLACEHOLDER]` no ar.** Esses campos alimentam o JSON-LD, e
endereço meia-boca no Google é pior que endereço nenhum.

**Não vincule a marca ao Riacho Fundo.** Pedido do cliente (2026-09-14): o site
fala Brasília ou Distrito Federal. Rua, bairro e CEP ficam vazios no config de
propósito.

**Não puxe dado dos homônimos.** O site antigo do próprio domínio era de uma
Supera de Ribeirão Preto, e o Instagram `@superacontabilidade` é de uma Supera de
Valparaíso-GO. Nenhum dos dois é o cliente.

**Não use site brasileiro como referência visual.** Regra do Julio: referência de
layout e componente vem de site de nível mundial.

**Não copie painel do Athos Bulcão no azulejo.** O padrão é desenho original
inspirado no modernismo de Brasília; cópia de obra tem direito autoral.

**Não invente avaliação nem depoimento.** A seção de avaliações só aparece com
avaliação real do Google no config.

**Rode o pnpm 11, não o do sistema.** O `node_modules` foi montado com pnpm 11.24
e o Homebrew instala o 10, que aborta procurando outro cache. Use
`npx -y pnpm@11.24.0 install|add|dev|build`.

**Não rode `build` com o `dev` no ar.** Os dois escrevem em `.next`.

**Não mexa em `next.config.ts` sem entender o `turbopack.root`.** Ele está lá
porque a home do Julio tem um `package-lock.json` solto, e sem a trava o
Turbopack elege a home inteira como raiz do workspace.

**Não troque o gerenciador de pacote.** É pnpm, e `pnpm-workspace.yaml` carrega
o `allowBuilds` de `sharp` e `unrs-resolver`; sem ele o install falha com
`ERR_PNPM_IGNORED_BUILDS`.
