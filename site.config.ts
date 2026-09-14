// Fonte única de verdade da marca. Trocar AQUI propaga pro layout, metadata,
// schema, seções da home e rodapé. Nenhum dado de contato solto em componente.
//
// [PLACEHOLDER] = dado ainda não confirmado pelo cliente.
// [VALIDAR] = texto escrito pela IDEVA, precisa da leitura do Danilo antes de publicar.

export const site = {
  name: "Supera Contabilidade",
  tagline: "Contabilidade de pai e filho em Brasília",
  url: "https://www.superacontabilidade.com.br", // o domínio sem www redireciona (308) pra este
  description:
    "Escritório de contabilidade em Brasília, aberto em 2014 e tocado por pai e filho. Abertura de empresa, contabilidade mensal, folha e impostos, com conversa direta no WhatsApp.", // [VALIDAR]
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
    whatsapp: "5561981999430", // da bio do Instagram @supera.contabilidade (2026-09-14)
    whatsappMessage: "Olá! Vim pelo site e quero falar sobre contabilidade.",
    hours: "", // ex: "Segunda a sexta, 9h às 18h". Vazio some do site. Horário a confirmar com o Danilo.
  },

  // Perfis oficiais (viram sameAs no JSON-LD). Só entra o que existe de verdade.
  // Atenção: @superacontabilidade (sem ponto) é de outro escritório, de Valparaíso-GO.
  // O do cliente é @supera.contabilidade.
  profiles: ["https://www.instagram.com/supera.contabilidade/"] as string[],

  // Topo da home. A pessoa escolhe o que aconteceu e cai no WhatsApp com a
  // mensagem já escrita. A urgente fica separada das outras. [VALIDAR]
  situations: {
    urgent: {
      label: "Chegou uma multa ou notificação",
      detail: "Manda uma foto do documento. A gente olha o que é e o que precisa ser feito.",
      message: "Olá! Recebi uma multa ou notificação e preciso de ajuda.",
    },
    common: [
      {
        label: "Vou abrir uma empresa",
        detail: "Do tipo de empresa ao CNPJ na mão, sabendo quanto vai pagar de imposto.",
        message: "Olá! Quero abrir uma empresa.",
      },
      {
        label: "Preciso trocar de contador",
        detail: "A gente pega os documentos com o contador atual e confere o que chegou.",
        message: "Olá! Quero trocar de contador.",
      },
      {
        label: "Chegou a época do imposto",
        detail: "Declaração, guia atrasada ou dúvida sobre quanto vai pagar.",
        message: "Olá! Preciso de ajuda com imposto.",
      },
    ],
  },

  // Serviços. Conferidos em 2026-09-14 com o site antigo da própria Supera
  // (superacontabilidadedf.com.br): certidões, apuração de impostos, demonstrativos
  // pra banco, folha, planejamento tributário, abertura e regularização. [VALIDAR]
  services: [
    {
      title: "Abertura de empresa",
      description:
        "Tipo de empresa, regime de imposto, CNPJ e inscrições. Você começa sabendo quanto vai pagar.",
    },
    {
      title: "Contabilidade mensal",
      description:
        "Escrituração, balancete e os demonstrativos que banco e financeira pedem, com alguém pra explicar o que os números dizem.",
    },
    {
      title: "Departamento pessoal",
      description: "Admissão, folha, férias, rescisão e eSocial dentro do prazo.",
    },
    {
      title: "Impostos e declarações",
      description:
        "Guias calculadas antes do vencimento e planejamento tributário pra não pagar imposto a mais quando o negócio muda de tamanho.",
    },
    {
      title: "Troca de contador",
      description:
        "A contabilidade continua de onde parou. Antes de assumir, a gente confere o que veio do escritório anterior.",
    },
    {
      title: "Regularização",
      description:
        "Certidão negada, pendência na Receita, multa ou empresa parada. Primeiro a gente descobre o tamanho do problema.",
    },
  ],

  // "Como começa". É uma sequência de verdade, por isso vai numerada. [VALIDAR]
  steps: [
    {
      title: "Você chama no WhatsApp",
      text: "Conta o que aconteceu do seu jeito. Pode mandar foto de documento.",
    },
    {
      title: "A gente conversa",
      text: "O Danilo entende o tamanho da empresa, o regime e o que está pegando.",
    },
    {
      title: "Você recebe a proposta",
      text: "Com o que vai ser feito e quanto custa. Aí você decide.",
    },
  ],

  // Quem somos. Sócios conforme a Receita. Foto entra quando existir.
  founders: [
    { name: "Paulo Sérgio Romão", role: "Sócio-administrador" },
    { name: "Danilo de Santo Romão", role: "Sócio, cuida do atendimento" },
  ],
  aboutPhoto: "", // caminho em /public/img quando a sessão de fotos acontecer
  about: [
    "A Supera abriu em 2014 e continua com o tamanho que permite conhecer cada cliente pelo nome.",
    "Hoje o escritório está nas mãos do Paulo e do filho dele, o Danilo. A carteira foi construída por indicação: quem gosta do trabalho apresenta o próximo cliente.",
  ], // [VALIDAR]

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
      a: "Dá. A troca pode acontecer em qualquer mês. A gente combina a data, pede os documentos ao contador atual e confere o que chegou antes de assumir.",
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
      "Uma mensagem no WhatsApp já basta pra começar.",
  },
} as const;

export type Site = typeof site;

export const whatsappUrl = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
