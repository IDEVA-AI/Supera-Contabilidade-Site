// Fonte única de verdade da marca. Trocar AQUI propaga pro layout, metadata,
// schema, seções da home e rodapé. Nenhum dado de contato solto em componente.
//
// [PLACEHOLDER] = dado ainda não confirmado pelo cliente.
// [VALIDAR] = texto escrito pela IDEVA, precisa da leitura do Danilo antes de publicar.

export const site = {
  name: "Supera Contabilidade",
  tagline: "Contabilidade para empresas em Brasília",
  url: "https://www.superacontabilidade.com.br", // o domínio sem www redireciona (308) pra este
  description:
    "Escritório de contabilidade em Brasília desde 2014. Abertura de empresa, contabilidade mensal, folha, impostos e regularização, com um sócio responsável por cada empresa da carteira.", // [VALIDAR]
  foundedYear: 2014, // Receita: abertura em 2014-04-17
  cnpj: "20.645.761/0001-08",

  contact: {
    // O cliente quer a marca vinculada ao DF, nunca ao Riacho Fundo (2026-09-14).
    // Por isso rua, bairro e CEP ficam vazios de propósito: o schema não emite.
    city: "Brasília",
    state: "DF",
    region: "Distrito Federal",
    street: "",
    postalCode: "",
    // Fixo e e-mail da Receita, (61) 3399-0425 e supera.superacontabilidade@gmail.com,
    // ficam fora do ar até o Danilo confirmar que atendem. O canal confirmado é o WhatsApp.
    email: "",
    phone: "", // E.164, ex: +556133990425
    phoneLabel: "",
    whatsapp: "5561981999430", // da bio do Instagram do cliente (2026-09-14)
    whatsappMessage: "Olá! Vim pelo site e quero falar sobre contabilidade.",
    hours: "", // ex: "Segunda a sexta, 9h às 18h". Vazio some do site. Horário a confirmar com o Danilo.
  },

  // Perfis oficiais (viram sameAs no JSON-LD). Só entra o que existe de verdade.
  // O perfil do cliente passou a ser @superacontabilidade.com.br em 2026-09-22 (link
  // passado pelo Julio). O antigo @supera.contabilidade saiu daqui; se ele continuar
  // no ar, é decisão do Julio se volta pro sameAs.
  // Atenção aos homônimos: @superacontabilidade (sem ponto e sem .com.br) é de outro
  // escritório, de Valparaíso-GO, e não é o cliente.
  profiles: ["https://www.instagram.com/superacontabilidade.com.br/"] as string[],

  // Contas de anúncio e verificação de domínio. São IDs públicos, não senha: moram
  // aqui e não em variável de ambiente porque a Vercel é da conta da Supera e a IDEVA
  // não entra nela. Ligar a medição = preencher e dar push. Vazio = nada carrega.
  tracking: {
    ga4: "", // GA4, ex: "G-XXXXXXXXXX"
    googleAds: "", // Google Ads, ex: "AW-123456789"
    googleAdsWhatsappLabel: "", // rótulo da conversão "clique no WhatsApp"
    metaPixel: "", // pixel do Meta, só números
  },
  verification: {
    google: "", // Search Console, só o valor do content da meta tag
    meta: "", // facebook-domain-verification, só o valor
  },

  // Card ao lado da imagem no topo. Não fala de atendimento de propósito (decisão do
  // Julio, 2026-09-22): quem cuida da empresa é sócio e responde tecnicamente pelo que
  // assina, e é esse o posicionamento. Os sócios aparecem logo abaixo, em Quem somos. [VALIDAR]
  heroCard: {
    eyebrow: "Escritório contábil em Brasília",
    title: "12 anos de CNPJ ativo",
    text: "A sua empresa fica com um sócio do escritório, que acompanha a rotina e responde pelo que assina.",
  },

  // Topo da home. A pessoa escolhe o que aconteceu e cai no WhatsApp com a
  // mensagem já escrita. A urgente fica separada das outras. `short` é o nome
  // curto que aparece nos atalhos do fechamento da página. [VALIDAR]
  heroIntro:
    "Você não precisa entender de contabilidade pra falar com a gente. Escolha o que aconteceu e o WhatsApp abre com a mensagem pronta.",
  situations: {
    urgent: {
      icon: "multa",
      short: "Multa ou notificação",
      label: "Chegou uma multa ou notificação",
      detail: "Manda uma foto do documento. A gente olha o que é e o que precisa ser feito.",
      message: "Olá! Recebi uma multa ou notificação e preciso de ajuda.",
    },
    common: [
      {
        icon: "empresa",
        short: "Abrir empresa",
        label: "Vou abrir uma empresa",
        detail:
          "Antes do CNPJ, a gente escolhe com você o tipo de empresa e o regime de imposto, pra não começar pagando a mais.",
        message: "Olá! Quero abrir uma empresa.",
      },
      {
        icon: "troca",
        short: "Trocar de contador",
        label: "Quero trocar de contador",
        detail:
          "Seu contador sumiu ou não resolve? A gente pede os documentos a ele e confere o que chegou.",
        message: "Olá! Quero trocar de contador.",
      },
      {
        icon: "imposto",
        short: "Imposto",
        label: "Chegou a época do imposto",
        detail: "Declaração, guia atrasada ou dúvida sobre quanto vai pagar.",
        message: "Olá! Preciso de ajuda com imposto.",
      },
    ],
  },

  // Serviços, na ordem das situações do topo. Conferidos em 2026-09-14 com o site antigo da própria Supera
  // (superacontabilidadedf.com.br): certidões, apuração de impostos, demonstrativos
  // pra banco, folha, planejamento tributário, abertura e regularização. [VALIDAR]
  services: [
    {
      icon: "empresa",
      title: "Abertura de empresa",
      description:
        "Tipo de empresa, regime de imposto, CNPJ e inscrições. Você começa sabendo quanto vai pagar.",
    },
    {
      icon: "troca",
      title: "Troca de contador",
      description:
        "A contabilidade continua de onde parou. Antes de assumir, a gente confere o que veio do escritório anterior.",
    },
    {
      icon: "regularizacao",
      title: "Regularização",
      description:
        "Certidão negada, pendência na Receita, multa ou empresa parada. Primeiro a gente descobre o tamanho do problema.",
    },
    {
      icon: "imposto",
      title: "Impostos e declarações",
      description:
        "Guias calculadas antes do vencimento e planejamento tributário pra não pagar imposto a mais quando o negócio muda de tamanho.",
    },
    {
      icon: "mensal",
      title: "Contabilidade mensal",
      description:
        "Escrituração, balancete e os demonstrativos que banco e financeira pedem, com alguém pra explicar o que os números dizem.",
    },
    {
      icon: "pessoal",
      title: "Departamento pessoal",
      description: "Admissão, folha, férias, rescisão e eSocial dentro do prazo.",
    },
  ],

  // "Como começa". É uma sequência de verdade, por isso vai numerada. [VALIDAR]
  steps: [
    {
      icon: "conversa",
      title: "Você manda mensagem",
      text: "Conta o que aconteceu do seu jeito. Pode mandar foto do documento.",
    },
    {
      icon: "caso",
      title: "O Danilo analisa o caso",
      text: "Tamanho da empresa, regime de imposto e o que está pegando. Pode explicar com as suas palavras.",
    },
    {
      icon: "proposta",
      title: "Você recebe a proposta",
      text: "Com o que vai ser feito e quanto custa. A decisão fica com você.",
    },
  ],

  // Quem somos. Sócios conforme a Receita.
  founders: [
    { name: "Paulo Sérgio Romão", role: "Sócio-administrador" },
    { name: "Danilo de Santo Romão", role: "Sócio, responde pelas empresas da carteira" },
  ],

  // Imagens geradas no Codex em duotone da marca, que seguram o lugar até a foto real
  // chegar. Arquitetura de Brasília (2026-09-15) e cena de trabalho do cliente da
  // Supera (2026-09-22). Nenhuma é o escritório nem a equipe, e a legenda nunca diz
  // que é: fala da situação ou do lugar. Regra inteira no cofre, em
  // `design/direcao-de-imagem.md`.
  images: {
    hero: {
      src: "/img/home/topo.jpg",
      alt: "Fachada modernista com brises de concreto, em tons de azul",
      caption: "Brises de concreto, Brasília",
    },
    services: {
      src: "/img/home/servicos.jpg",
      alt: "Duas pessoas sentadas à mesa de um escritório lendo papéis de uma empresa, em tons de azul",
      caption: "A papelada que sai da sua mesa",
    },
    about: {
      src: "/img/home/quem-somos.jpg",
      alt: "Marquise de concreto sobre pilotis com sombras de fim de tarde, em tons de azul",
      caption: "Pilotis e marquise, Brasília",
    },
  },

  // Fotos reais do cliente, uma por ponto da home. Mesma chave de `images`: assim que
  // `src` for preenchido, a foto entra no lugar da imagem de arquitetura e leva junto
  // o alt e a legenda daqui. Alt e legenda já estão escritos pra que humanizar o site
  // depois da sessão de fotos seja só copiar o arquivo pra /public/img/home e colar o
  // caminho. Foto de banco de imagem e rosto gerado por IA não entram: quem visita a
  // sala precisa reconhecer o que viu aqui. [VALIDAR: nome na legenda]
  photos: {
    hero: {
      src: "", // o topo voltou pra arquitetura em 2026-09-22 (decisão do Julio); o
      // retrato do Danilo continua em /img/home/danilo.jpg, é só recolar o caminho
      alt: "Danilo de Santo Romão, sócio da Supera Contabilidade",
      caption: "Danilo, quem responde no WhatsApp",
    },
    services: {
      src: "", // Danilo trabalhando de verdade: computador, papel na mesa, WhatsApp aberto
      alt: "Danilo trabalhando na mesa do escritório da Supera",
      caption: "O dia a dia do escritório",
    },
    about: {
      src: "/img/home/socios.jpg", // os dois retratos de estúdio lado a lado
      alt: "Paulo Sérgio Romão e Danilo de Santo Romão, sócios da Supera Contabilidade",
      caption: "Paulo e Danilo, sócios da Supera",
    },
  },
  about: [
    "A Supera abriu em 2014 e continua com o tamanho que permite conhecer cada cliente pelo nome.",
    "O Danilo acompanha as empresas da carteira e conversa direto com cada cliente. A carteira foi construída por indicação: quem gosta do trabalho apresenta o próximo.",
  ], // [VALIDAR]

  // Assinatura dos artigos. Quem assina hoje é o escritório, porque o Danilo ainda não
  // leu os três textos; quando ele ler e assumir, é trocar nome e papel aqui e colar a
  // foto. Sem foto, o bloco sai só com o nome. [VALIDAR]
  author: {
    name: "Supera Contabilidade",
    role: "Escritório de contabilidade em Brasília, desde 2014",
    text: "Quem escreve aqui é quem faz a contabilidade. Se ficou dúvida no meio do texto, pergunta direto.",
    photo: "", // retrato do Danilo, quadrado, quando a sessão de fotos acontecer
    photoAlt: "",
  },

  // Avaliações reais do Google. Enquanto estiver vazio, a seção não aparece.
  googleProfileUrl: "", // [PLACEHOLDER]
  reviews: [] as { name: string; text: string; when: string }[],

  // Perguntas frequentes. Respostas sem número nem prazo que dependam de
  // confirmação. [VALIDAR]
  faq: [
    {
      q: "Quanto custa a contabilidade?",
      a: "Depende do tipo de empresa, do regime de imposto e de quantos funcionários ela tem. Na primeira conversa a gente entende o seu caso e manda a proposta com o valor.",
    },
    {
      q: "Já tenho contador. Dá pra trocar no meio do ano?",
      a: "Dá. A troca pode acontecer em qualquer mês. A gente combina a data, pede os documentos ao contador atual e confere o que chegou antes de assumir. Quem conversa com o contador atual é a gente.",
    },
    {
      q: "Recebi uma notificação da Receita. É grave?",
      a: "Nem sempre. Muita notificação é declaração pendente e se resolve rápido. Manda uma foto do documento no WhatsApp e a gente te diz o que é.",
    },
    {
      q: "Quanto tempo leva pra abrir uma empresa no DF?",
      a: "Depende da atividade e das licenças que ela exige. Na conversa inicial a gente já te passa o prazo do seu caso.",
    },
    {
      q: "Preciso ir até o escritório?",
      a: "Não precisa. A conversa e o envio de documentos podem ser feitos pelo WhatsApp. Se preferir conversar pessoalmente, é só combinar.",
    },
  ],

  cta: {
    primary: "Falar no WhatsApp",
    headline: "Conta pra gente o que aconteceu.",
    support:
      "Pode mandar do jeito que está, com a papelada bagunçada mesmo. A gente ajuda a separar o que é urgente.",
  },
} as const;

export type Site = typeof site;

export const whatsappUrl = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const instagramUrl = site.profiles.find((url) => url.includes("instagram.com"));

export type Visual = { src: string; alt: string; caption: string };

// Qual imagem entra em cada ponto da home: a foto real do cliente ganha da imagem de
// arquitetura assim que existir. Um lugar só decide, então nenhuma seção esquece de
// trocar quando a sessão de fotos chegar.
export const visual = (key: keyof typeof site.images): Visual =>
  site.photos[key].src ? site.photos[key] : site.images[key];

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
