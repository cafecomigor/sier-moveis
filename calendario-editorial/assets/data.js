/*
 * CONFIGURAÇÃO DO CALENDÁRIO EDITORIAL — SIER MÓVEIS
 * ----------------------------------------------------
 * Datas seguem o cronograma de 3 posts/semana combinado (começa qui 15/10,
 * depois sáb, e vira seg/qua/sex). Sequência: Roberta (3 posts) e depois
 * Soma (3 posts).
 */

const CALENDAR_DATA = {
  client: {
    name: "Sier Móveis",
    shortName: "SM",
    tagline: "Móveis e decoração",
    accent: "#8a5a3b"
  },

  period: {
    label: "Outubro–Novembro 2026",
    start: "2026-10-15",
    end: "2026-11-30",
    headline: "Calendário editorial",
    intro: "Programação de posts das coleções Roberta e Soma, publicados três vezes por semana."
  },

  pillars: [
    { name: "Roberta", desc: "Cadeira Roberta — curva única, presença serena." },
    { name: "Soma", desc: "Buffet Soma — madeira, laca off white e aço carbono." }
  ],

  posts: [
    {
      id: 1, date: "2026-10-15", type: "card", status: "approved", pillar: "Roberta",
      title: "Roberta — A Delicadeza",
      caption: "Existem momentos em que observar é o bastante. Com a Roberta, é preciso sentir. O encosto nasce de uma única curva, contínua e acabada com tanta delicadeza que o olhar desliza e a mão decide ficar. Sem arestas. Sem pressa. Um desenho que se compreende pelo toque.\n\nRoberta. Feita para ser sentida.",
      images: ["images/roberta-1.png"]
    },
    {
      id: 2, date: "2026-10-17", type: "card", status: "approved", pillar: "Roberta",
      title: "Roberta — A Apresentação",
      caption: "Apresentamos a Roberta.\n\nUma cadeira de presença serena. Estrutura em madeira de linhas leves, assento estofado e proporções desenhadas para a mesa e, na mesma medida, para o olhar. Um design atemporal que dispensa explicações e, simplesmente, permanece.\n\nRoberta.",
      images: ["images/roberta-2.png"]
    },
    {
      id: 3, date: "2026-10-19", type: "card", status: "approved", pillar: "Roberta",
      title: "Roberta — O Ritmo",
      caption: "Uma. Depois outra. Depois cinco.\n\nA cadeira Roberta entrega o que é o verdadeiro ritmo: a mesma curva no encosto, a mesma leveza nas pernas, a mesma elegância em cadência. Em uma mesa posta, ela deixa de ser apenas uma peça e vira arquitetura. Um único desenho. Múltiplas composições.\n\nRoberta.",
      images: ["images/roberta-3-1.png", "images/roberta-3-2.png"]
    },
    {
      id: 4, date: "2026-10-21", type: "card", status: "approved", pillar: "Soma",
      title: "Soma — O Detalhe",
      caption: "No Soma, o detalhe é o discurso.\n\nSobre a laca off white, um recorte sutil dispensa o puxador e convida ao gesto. Duas texturas, um único encontro, nenhum ruído visual.\n\nSoma. Quando o silêncio também é design.",
      images: ["images/soma-1.png"]
    },
    {
      id: 5, date: "2026-10-23", type: "card", status: "approved", pillar: "Soma",
      title: "Soma — O Conceito",
      caption: "Soma não é só um nome. É o princípio construtivo.\n\nOs tons amadeirados que aquecem, a laca off white que acalma, o aço carbono que sustenta. Cada matéria é inteira por si e, juntas, revelam algo maior do que a soma das partes. Por fora, a calma de uma superfície contínua. Por dentro, a nobreza da madeira que se revela quando as portas se abrem.\n\nSoma. Matéria que se completa.",
      images: ["images/soma-2-1.png", "images/soma-2-2.png"]
    },
    {
      id: 6, date: "2026-10-26", type: "card", status: "approved", pillar: "Soma",
      title: "Soma — A Proporção",
      caption: "Proporção não se improvisa.\n\nDo tampo de cantos suaves ao contorno amadeirado que abraça o acabamento em off white. Do pé fino em aço carbono que faz o buffet flutuar, à precisão do seu volume no espaço. O Soma foi desenhado para ser admirado de perto e de longe, de cima e de lado, e continuar exato em todos os ângulos. Uma peça que marca a sala justamente pelo que escolheu não exibir em excesso.\n\nSoma.",
      images: ["images/soma-3.png"]
    }
  ],

  nextPublication: "2026-10-15",
  priorityDays: "3x por semana — começa qui (15/10) e sáb (17/10), depois segue seg/qua/sex",
  production: "Cafecomigor"
};
