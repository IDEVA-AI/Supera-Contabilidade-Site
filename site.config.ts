// Fonte única de verdade da marca. Trocar AQUI propaga pro layout, metadata,
// schema, seções da home e rodapé. Nenhum dado de contato solto em componente.
//
// [PLACEHOLDER] = valor de exemplo, precisa ser confirmado com o cliente.

export const site = {
  name: "Supera Contabilidade",
  tagline: "Contabilidade que anda junto com o seu negócio",
  url: "https://superacontabilidade.com.br", // [PLACEHOLDER]
  description:
    "Escritório de contabilidade para empresas que querem número confiável na hora de decidir: abertura, escrituração, folha, imposto e apoio na gestão.", // [PLACEHOLDER]

  contact: {
    // O cliente quer a marca vinculada ao DF, nunca ao Riacho Fundo (2026-09-14).
    // Por isso rua, bairro e CEP ficam vazios de propósito: o schema não emite.
    city: "Brasília",
    state: "DF",
    region: "Distrito Federal",
    street: "",
    postalCode: "",
    email: "supera.superacontabilidade@gmail.com", // da Receita [PLACEHOLDER]
    phone: "+556133990425", // E.164, fixo da Receita [PLACEHOLDER]
    phoneLabel: "(61) 3399-0425", // [PLACEHOLDER]
    whatsapp: "5511900000000", // [PLACEHOLDER]
    whatsappMessage: "Olá! Vim pelo site e quero falar sobre contabilidade.",
    hours: "Segunda a sexta, 9h às 18h", // [PLACEHOLDER]
  },

  // Perfis oficiais (viram sameAs no JSON-LD). Só entra o que existe de verdade.
  profiles: [] as string[],
  instagram: "", // [PLACEHOLDER]

  // Serviços da home. Cada item vira um card; a ordem aqui é a ordem na página.
  services: [
    {
      slug: "abertura-de-empresa",
      title: "Abertura e regularização",
      description:
        "CNPJ, enquadramento, alvará e inscrição estadual, com o regime tributário escolhido pela conta, não pelo hábito.",
    },
    {
      slug: "contabilidade-mensal",
      title: "Contabilidade mensal",
      description:
        "Escrituração em dia, balancete que fecha e demonstrativo que dá pra ler sem ser contador.",
    },
    {
      slug: "folha-de-pagamento",
      title: "Departamento pessoal",
      description:
        "Admissão, folha, férias, rescisão e eSocial no prazo, sem susto de multa no fim do mês.",
    },
    {
      slug: "impostos",
      title: "Apuração de impostos",
      description:
        "Guias calculadas e entregues antes do vencimento, com revisão do regime sempre que a operação muda.",
    },
    {
      slug: "consultoria",
      title: "Apoio na decisão",
      description:
        "Pró-labore, distribuição de lucro, planejamento tributário e o número na mesa antes de investir.",
    },
    {
      slug: "recuperacao",
      title: "Revisão e recuperação",
      description:
        "Diagnóstico do que foi pago a mais e organização do passivo antes que ele vire dívida ativa.",
    },
  ],

  // Provas e diferenciais da seção "por que a Supera". Trocar por prova real.
  highlights: [
    { label: "Anos de estrada", value: "12" }, // aberta em 2014-04-17 (Receita)
    { label: "Empresas atendidas", value: "—" }, // [PLACEHOLDER]
    { label: "Resposta em até", value: "24h" }, // [PLACEHOLDER]
  ],

  // Seção sobre. Um parágrafo por item.
  about: [
    "A Supera Contabilidade nasceu para resolver o problema de quem só recebe do contador uma guia por e-mail e nunca uma explicação.",
    "Aqui o trabalho é o mesmo de sempre (escrituração, folha, imposto), mas entregue de um jeito que serve pra decidir: número no prazo, linguagem de dono e alguém do outro lado quando a dúvida aparece.",
  ], // [PLACEHOLDER]

  cta: {
    primary: "Falar no WhatsApp",
    secondary: "Ver os serviços",
    headline: "Quer entender quanto a sua empresa está pagando a mais?",
    support:
      "Manda uma mensagem contando o tamanho da operação e o regime atual. A gente devolve um diagnóstico do que dá pra ajustar.",
  },
} as const;

export type Site = typeof site;

export const whatsappUrl = (message: string = site.contact.whatsappMessage) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? site.url;
