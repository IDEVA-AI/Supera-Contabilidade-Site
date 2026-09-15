// Landing page de abertura de empresa, feita pra tráfego pago (Google Ads).
//
// `null` = dado que ainda não temos do Danilo. A página mostra um marcador
// tracejado "A confirmar" no lugar e ele some quando o campo é preenchido.
// Enquanto `draft` for true, a página fica fora do Google (noindex) e do sitemap.
// Números de taxa e prazo conferidos em fonte oficial em 2026-09-15
// (JUCIS-DF, Redesim DF, Receita). Textos da IDEVA seguem [VALIDAR].

export const lp = {
  draft: true,
  path: "/abrir-empresa",

  // Mensagem própria da página: o Danilo sabe na hora que o contato veio do anúncio.
  whatsappMessage: "Olá! Vim pela página de abertura de empresa e quero abrir a minha.",

  // Dados que faltam.
  offer: null as string | null, // ex: "Abertura sem custo pra quem fecha a contabilidade mensal"
  fee: null as string | null, // honorário da abertura, ex: "R$ 000 à vista"
  deadline: null as string | null, // ex: "Em média 7 dias úteis, do primeiro contato ao CNPJ"
  included: null as string[] | null, // o que a abertura inclui
  niche: null as string | null, // tipo de negócio foco, se houver
  googleReviewsUrl: null as string | null,

  hero: {
    image: { src: "/img/lp/abrir-empresa.jpg", alt: "Parede de cobogós de concreto em estilo modernista, em tons de azul" },
    eyebrow: "Abertura de empresa em Brasília",
    title: "Abra sua empresa já sabendo quanto vai pagar de imposto.",
    intro:
      "O tipo de empresa e o regime de imposto são escolhidos junto com o CNPJ. A gente faz essa conta com você antes, e só depois pede o registro.",
    cta: "Quero abrir minha empresa",
    ctaNote: "A conversa começa no WhatsApp. A proposta vem antes de qualquer compromisso.",
    // Painel do lado: o que a pessoa leva da abertura.
    outcomes: [
      "Tipo de empresa e regime escolhidos com a conta feita",
      "CNPJ já com o Simples Nacional, quando ele compensa",
      "Inscrição no DF e licença de funcionamento",
    ],
  },

  // Onde a abertura costuma dar errado. [VALIDAR]
  mistakes: [
    {
      title: "Tipo de empresa",
      text: "O empresário individual responde com os bens pessoais pelas dívidas da empresa. Com sócio ou risco no negócio, a LTDA costuma proteger melhor.",
    },
    {
      title: "Regime de imposto",
      text: "Desde dezembro de 2025, o Simples Nacional é pedido junto com o CNPJ. Quem deixa passar só consegue entrar em janeiro do ano seguinte.",
    },
    {
      title: "Atividade no CNPJ",
      text: "O código de atividade define imposto e licença. Em alguns serviços, o enquadramento leva a alíquota inicial do Simples de 6% pra 15,5%.",
    },
    {
      title: "Endereço",
      text: "Em Brasília, nem todo endereço aceita toda atividade. A consulta de viabilidade confere isso, e vale fazer antes de assinar o aluguel.",
    },
  ],

  // Sequência real da abertura no DF.
  steps: [
    {
      title: "Conversa no WhatsApp",
      text: "Você conta o que a empresa vai fazer, se tem sócio e quanto espera faturar. O Danilo monta a proposta com tipo de empresa e regime.",
    },
    {
      title: "Viabilidade",
      text: "A Administração Regional confere o nome e se a atividade é permitida no endereço.",
    },
    {
      title: "Registro e CNPJ",
      text: "Contrato registrado na JUCIS-DF e CNPJ emitido com o regime escolhido. Você assina pela conta gov.br.",
    },
    {
      title: "Inscrição no DF e licença",
      text: "Cadastro fiscal do DF e licença de funcionamento. Atividade de baixo risco não passa por vistoria.",
    },
    {
      title: "Primeiro mês",
      text: "A contabilidade começa junto com a empresa, com as guias calculadas antes do vencimento.",
    },
  ],

  // Taxa oficial da JUCIS-DF em 2026 (DODF 247, de 31/12/2025).
  juntaFees: [
    { label: "Empresário individual", value: "R$ 216,34" },
    { label: "Sociedade limitada (LTDA ou unipessoal)", value: "R$ 425,45" },
  ],

  faq: [
    {
      q: "Quanto custa abrir empresa no DF?",
      a: "Tem a taxa da Junta Comercial, que em 2026 é de R$ 216,34 pra empresário individual e R$ 425,45 pra sociedade limitada, e o honorário do contador pela abertura.",
      pending: "valor do honorário e se a taxa da Junta está inclusa",
    },
    {
      q: "Quanto tempo leva?",
      a: "Numa atividade de baixo risco, o registro no DF costuma caber em poucos dias úteis. Atividade que exige vistoria, como alimentação ou saúde, leva semanas.",
      pending: "prazo médio das aberturas feitas pela Supera",
    },
    {
      q: "Posso usar o endereço da minha casa?",
      a: "Depende da atividade e do que a Lei de Uso e Ocupação do Solo permite naquele endereço. A consulta de viabilidade responde isso antes do registro.",
    },
    {
      q: "Preciso ir até o escritório ou à Junta?",
      a: "Não. O registro é digital e a assinatura é feita pela conta gov.br nível prata ou ouro, ou por certificado digital.",
    },
    {
      q: "Já tenho CNPJ. Vocês atendem?",
      a: "Atendem. Aí o caso é troca de contador ou alteração da empresa, e a conversa começa pelo mesmo WhatsApp.",
    },
  ] as { q: string; a: string; pending?: string }[],

  closing: {
    title: "Conta o que você vai abrir.",
    text: "Uma mensagem basta: o que a empresa vai fazer, se tem sócio e quanto você espera faturar no primeiro ano.",
  },
};
