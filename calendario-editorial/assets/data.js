/*
 * CONFIGURAÇÃO DO CALENDÁRIO EDITORIAL — SIER MÓVEIS
 * ----------------------------------------------------
 * Legendas ainda estão como placeholder ("Legenda a definir") — troque pelo
 * texto real de cada post assim que tiver. Datas seguem o cronograma de
 * 3 posts/semana combinado (começa qui 15/10, depois sáb, e vira seg/qua/sex).
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
    { name: "Roberta", desc: "Posts da coleção Roberta." },
    { name: "Soma", desc: "Posts da coleção Soma." }
  ],

  posts: [
    { id: 1, date: "2026-10-15", type: "card", status: "approved", pillar: "Roberta", title: "Roberta — Post 1", caption: "Legenda a definir.", images: ["images/roberta-1.png"] },
    { id: 2, date: "2026-10-17", type: "card", status: "approved", pillar: "Roberta", title: "Roberta — Post 2", caption: "Legenda a definir.", images: ["images/roberta-2.png"] },
    { id: 3, date: "2026-10-19", type: "card", status: "approved", pillar: "Roberta", title: "Roberta — Post 3", caption: "Legenda a definir.", images: ["images/roberta-3-1.png", "images/roberta-3-2.png"] },
    { id: 4, date: "2026-10-21", type: "card", status: "approved", pillar: "Soma",    title: "Soma — Post 1",    caption: "Legenda a definir.", images: ["images/soma-1.png"] },
    { id: 5, date: "2026-10-23", type: "card", status: "approved", pillar: "Soma",    title: "Soma — Post 2",    caption: "Legenda a definir.", images: ["images/soma-2-1.png", "images/soma-2-2.png"] },
    { id: 6, date: "2026-10-26", type: "card", status: "approved", pillar: "Soma",    title: "Soma — Post 3",    caption: "Legenda a definir.", images: ["images/soma-3.png"] }
  ],

  nextPublication: "2026-10-15",
  priorityDays: "3x por semana — começa qui (15/10) e sáb (17/10), depois segue seg/qua/sex",
  production: "Cafecomigor"
};
