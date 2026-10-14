/*
 * CONFIGURAÇÃO DO CALENDÁRIO EDITORIAL — SIER MÓVEIS
 * ----------------------------------------------------
 * Vamos preenchendo aos poucos:
 *   1. Imagens: salvar em /calendario-editorial/images/ (uma por post).
 *   2. Cada post entra como um item no array "posts" abaixo —
 *      data, tipo (card/video), status, pilar, título, legenda e o
 *      caminho da imagem.
 *   3. "pillars" é opcional, mas ajuda a organizar o conteúdo por tema.
 */

const CALENDAR_DATA = {
  client: {
    name: "Sier Móveis",
    shortName: "SM",
    tagline: "Móveis e decoração",
    accent: "#8a5a3b"
  },

  period: {
    label: "A definir",
    start: "2026-11-01",
    end: "2026-11-30",
    headline: "Calendário editorial",
    intro: "Calendário em montagem — aguardando imagens, legendas e datas."
  },

  pillars: [],

  posts: [],

  nextPublication: "",
  priorityDays: "A definir",
  production: "Cafecomigor"
};
