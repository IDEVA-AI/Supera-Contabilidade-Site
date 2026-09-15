# CLAUDE.md — supera-contabilidade-site

## 1. O que é

Site institucional da Supera Contabilidade (Brasília-DF), cliente da IDEVA.
Next.js 16 App Router, React 19, Tailwind 4, TypeScript, tudo estático. Primeira
versão da home e do blog no ar desde 2026-09-14, com o WhatsApp real. Boa parte do
texto ainda é rascunho da IDEVA a validar com o Danilo. Estado do cliente em
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
- `app/layout.tsx` · raiz: metadata, fontes (Gabarito nos títulos, Hanken Grotesk no
  texto), JSON-LD da organização e `Analytics`. Não tem header nem footer.
- `app/(site)/layout.tsx` · casca do site institucional (header, footer, barra fixa do
  celular). Home e blog moram dentro do grupo `(site)`; o parêntese não entra na URL.
- `app/abrir-empresa/page.tsx` · landing page de anúncio pra quem vai abrir empresa,
  fora do grupo `(site)` de propósito: sem menu, um objetivo só (WhatsApp com mensagem
  própria). Conteúdo inteiro em `content/lp-abrir-empresa.ts`, onde `null` é dado que
  falta do cliente e vira marcador "A confirmar" na tela. Com `draft: true` a página
  sai com noindex e fora do sitemap.
- `components/analytics.tsx` · GA4, Google Ads e pixel do Meta, carregados só quando
  os IDs existem nas variáveis de ambiente da Vercel (`.env.example`). Todo clique em
  link `wa.me` vira evento (`whatsapp_click`, conversão do Ads, `Contact` no Meta).
- `components/placeholder.tsx` · o marcador tracejado de dado pendente.
- `components/icons.tsx` · ícones por assunto (lucide-react) mais WhatsApp e Instagram em
  SVG próprio, porque o lucide não traz marca. Config e conteúdo da landing page guardam só
  a chave (`icon: "empresa"`). Nenhum ícone é seta: seta é o sinal de que abre o WhatsApp.
- `app/(site)/page.tsx` · a home, na ordem: topo com seletor de situação, serviços, como
  começa, quem somos, avaliações, dúvidas, blog, fechamento. Regra de UX da página
  inteira: onde tem seta, a conversa começa no WhatsApp com mensagem pronta (topo,
  cada serviço e os atalhos do fechamento, que reusam o `short` das situações).
- `app/icon.svg` · favicon, um módulo do azulejo (não é o logo, que ainda não veio).
- `app/opengraph-image.png` (+ `.alt.txt`) · prévia do link no WhatsApp e nas redes.
  PNG estático gerado com Chrome headless a partir de HTML com as fontes do site; pra
  mudar, refazer o PNG, não criar rota dinâmica.
- `app/globals.css` · tokens com as cores medidas da marca (marinho, azul, ardósia,
  aço, prata, névoa, claro, branco) e o estilo do corpo de artigo (`.artigo`). Só
  tema claro.
- `components/sections.tsx` · todas as seções da home. `Reviews` e `BlogPreview`
  somem sozinhas quando não há dado. `Faq` também emite o JSON-LD `FAQPage`.
- `components/azulejo.tsx` · o padrão de azulejo, assinatura visual do site.
- `components/site-header.tsx` · exporta `nav`, que o rodapé reusa (no celular o
  menu do topo some e o rodapé é o caminho pro blog).
- `components/site-footer.tsx`,
  `components/mobile-contact-bar.tsx`, `components/container.tsx`
- `lib/blog.ts` · lê `content/blog/*.md` (gray-matter). Artigo com
  `status: rascunho` aparece no `dev` e nunca no build de produção.
- `app/(site)/blog/page.tsx`, `app/(site)/blog/[slug]/page.tsx` · lista e artigo
  (react-markdown + remark-gfm, JSON-LD `BlogPosting`, índice "Neste artigo" com âncora
  nos `##`, tempo de leitura, chamada de WhatsApp e "Continue lendo").
- `content/blog/` · os artigos. Três publicados em 2026-09-15 (abrir empresa no DF,
  trocar de contador, sair do MEI), com números de 2026 conferidos em fonte oficial e
  data de conferência no rodapé de cada um. Número que muda todo ano (limite do MEI,
  DAS, taxa da Junta) precisa ser revisto em janeiro.
- `app/sitemap.ts`, `app/robots.ts` · SEO técnico; o sitemap inclui só artigo publicado.
- `lib/schema.ts` · JSON-LD `AccountingService`; só emite campo preenchido.
- `lib/utils.ts` · `cn()` para juntar classes (não resolve conflito de classe).
- `public/img/` · `blog/{slug}.jpg` é a capa do artigo e `blog/{slug}-og.jpg` a prévia
  1200x630 com o título; `lp/abrir-empresa.jpg` é a imagem do topo da landing page;
  `home/{topo,servicos,quem-somos}.jpg` são as da home, apontadas em `site.images` no
  `site.config.ts` (a de serviços só aparece no desktop; a de quem somos sai quando
  `aboutPhoto` receber a foto real). Capa
  entra no frontmatter do artigo (`cover`, `coverAlt`, `ogImage`) e é servida por
  `next/image`. As imagens são de arquitetura modernista geradas pelo Codex em duotone
  da marca (2026-09-15), sem pessoas, sem texto e sem obra reconhecível. Rosto, equipe e
  escritório só com foto real da sessão do cliente. Texto nunca sai da IA: a prévia com
  título é HTML renderizado no Chrome headless com as fontes do site.
- `.env.example` · `NEXT_PUBLIC_SITE_URL`, o domínio final.

## 3. Vizinhos

- `~/projetos/martinek-adv/` · origem do motor de artigos. Daqui só veio o miolo;
  pilar/satélite, capa gerada e página de aprovação ficaram de fora e são o que
  copiar quando o ritmo semanal de artigos começar.
- `~/projetos/ideva-site/` · site da IDEVA, mesma stack e mesmas versões.
- `~/CLAUDE.md` · a porta da home do Mac.
- `github.com/IDEVA-AI/Supera-Contabilidade-Site` [externo: GitHub] · remoto
  `origin`, onde a IDEVA trabalha. **Não publica nada.**
- `github.com/superacontabilidadedp/superacont` [externo: GitHub] · remoto `supera`,
  na conta GitHub da Supera. É **este** que a Vercel do Danilo escuta: push na `main`
  dele publica o `superacontabilidade.com.br` em uns 30 segundos. A IDEVA-AI é
  colaboradora com escrita desde 2026-09-14. A branch `backup-initial-commit-2026-09-09`
  guarda o commit único que existia lá antes (arquivos iguais ao 9622b2f).
  Publicar = `git push origin main && git push supera main`, sempre os dois, pra não
  divergir. Não empurrar pro `supera` sem ok do Julio.

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

**Não fale de pai e filho nem de escritório de família.** Regra do Julio
(2026-09-14): é tema que não interessa a quem procura contador. O texto fala do que
a pessoa quer resolver, de Brasília e de quem atende.

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
