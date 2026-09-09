# CLAUDE.md — supera-contabilidade-site

## 1. O que é

Site institucional da Supera Contabilidade, cliente da IDEVA. Next.js 16 App
Router, React 19, Tailwind 4, TypeScript, tudo estático. Ainda é a **base**: a
estrutura está de pé e o conteúdo é rascunho a confirmar com o cliente.

## 2. Mapa interno

- `site.config.ts` · fonte única de nome, contato, WhatsApp, serviços, provas e
  textos. Campo com `[PLACEHOLDER]` não foi confirmado pelo cliente.
- `app/layout.tsx` · metadata, fonte Inter, JSON-LD, header e footer.
- `app/page.tsx` · a home, montada com as seções de `components/sections.tsx`.
- `app/globals.css` · tokens de cor (claro e escuro) e a cor da marca `--brand`.
- `app/sitemap.ts`, `app/robots.ts` · SEO técnico, leem a URL do config.
- `components/sections.tsx` · Hero, Services, About e CallToAction.
- `components/site-header.tsx`, `components/site-footer.tsx`, `components/container.tsx`
- `lib/schema.ts` · JSON-LD `AccountingService`; só emite campo preenchido.
- `lib/utils.ts` · `cn()` para juntar classes.
- `public/img/` · imagens da marca (vazio até vir material).
- `.env.example` · `NEXT_PUBLIC_SITE_URL`, o domínio final.

## 3. Vizinhos

- `~/projetos/martinek-adv/` · site de cliente no mesmo padrão (config única
  dirigindo o site), com motor de artigos e posts já resolvido. É de onde copiar
  quando esta base precisar de blog ou de silo de conteúdo.
- `~/projetos/ideva-site/` · site da IDEVA, mesma stack e mesmas versões.
- `~/CLAUDE.md` · a porta da home do Mac.
- `github.com/IDEVA-AI/Supera-Contabilidade-Site` [externo: GitHub] · o remoto.

## 4. Skills

- `ideva-dev` · antes de escrever ou alterar qualquer código aqui.
- `env-setup` · na abertura, por existir `package.json`.
- `brain` · quando o trabalho tocar servidor, deploy ou contexto do cliente.

## 5. O que não fazer

**Não crave contato, nome ou texto dentro de componente.** Tudo passa por
`site.config.ts`, senão diverge (já aconteceu no martinek-adv: o @ do Instagram
saiu errado nas artes por estar escrito em dois lugares).

**Não publique com `[PLACEHOLDER]` no ar.** Esses campos alimentam o JSON-LD, e
endereço meia-boca no Google é pior que endereço nenhum.

**Não mexa em `next.config.ts` sem entender o `turbopack.root`.** Ele está lá
porque a home do Julio tem um `package-lock.json` solto, e sem a trava o
Turbopack elege a home inteira como raiz do workspace.

**Não troque o gerenciador de pacote.** É pnpm, e `pnpm-workspace.yaml` carrega
o `allowBuilds` de `sharp` e `unrs-resolver`; sem ele o install falha com
`ERR_PNPM_IGNORED_BUILDS`.
