// Logica del quiz: Tabella A (D1+D2 -> percorso) e Tabella B (D3+D4 -> livello, messaggio, secondo percorso)

export const D1_OPTIONS = [
  { id: "corpo", label: "Corpo e silhouette" },
  { id: "viso", label: "Viso e pelle" },
  { id: "peli", label: "Peli superflui" },
  { id: "relax", label: "Relax e benessere" },
  { id: "sguardo", label: "Ciglia e sopracciglia" },
  { id: "maniepiedi", label: "Mani e piedi" },
  { id: "altro", label: "Altro" },
];

export const D2_OPTIONS = {
  corpo: [
    { id: "cellulite", label: "Cellulite, ritenzione e gambe pesanti" },
    { id: "tonicita", label: "Tonicità e silhouette" },
  ],
  viso: [
    { id: "spenta", label: "Pelle spenta" },
    { id: "rughe", label: "Rughe e segni del tempo" },
    { id: "macchie", label: "Macchie" },
    { id: "acne", label: "Acne e impurità" },
    { id: "valutazione", label: "Non lo so, voglio una valutazione" },
  ],
  peli: [
    { id: "duratura", label: "Soluzione duratura" },
    { id: "rapida", label: "Soluzione rapida e regolare" },
  ],
  relax: [
    { id: "staccare", label: "Voglio solo staccare" },
    { id: "riequilibrio", label: "Cerco un riequilibrio più profondo" },
  ],
  sguardo: [
    { id: "intenso", label: "Sguardo più intenso" },
    { id: "sopracciglia", label: "Sopracciglia definite e durature" },
  ],
  maniepiedi: [
    { id: "mani", label: "Mani curate" },
    { id: "piedi", label: "Piedi curati" },
  ],
};

export const D3_OPTIONS = [
  { id: "under35", label: "Under 35" },
  { id: "35-50", label: "35 – 50" },
  { id: "over50", label: "Over 50" },
  { id: "altro", label: "Preferisco non dirlo" },
];

export const D4_OPTIONS = [
  { id: "mai", label: "Mai" },
  { id: "qualche_volta", label: "Qualche volta" },
  { id: "regolarmente", label: "Regolarmente" },
  { id: "altro", label: "Altro" },
];

// Tabella A
const TABLE_A = {
  "corpo|cellulite": "corpo-leggero",
  "corpo|tonicita": "corpo-tonico",
  "viso|spenta": "luminosita",
  "viso|rughe": "anti-age-metodo-rosa",
  "viso|macchie": "uniformita",
  "viso|acne": "pelle-pulita",
  "peli|duratura": "laser-senza-pensieri",
  "peli|rapida": "liscia-tutto-l-anno",
  "relax|staccare": "pausa-benessere",
  "relax|riequilibrio": "equilibrio",
  "sguardo|intenso": "sguardo",
  "sguardo|sopracciglia": "sguardo",
  "maniepiedi|mani": "mani-e-piedi",
  "maniepiedi|piedi": "mani-e-piedi",
};

// Tabella B: eta|esperienza -> { livello, messaggio }
const TABLE_B = {
  "under35|mai": { livello: 1, msg: "È la tua prima volta: partiamo da una seduta e dalla consulenza gratuita, in cui ti spiego tutto. Alla tua età si lavora sulla prevenzione: bastano pochi gesti giusti." },
  "under35|qualche_volta": { livello: 2, msg: "Con due servizi complementari il risultato si vede prima e risparmi il 5%. È il momento migliore per costruire una pelle che invecchia bene." },
  "under35|regolarmente": { livello: 3, msg: "Ti prendi già cura di te con costanza: il percorso completo ti dà le sedute già programmate e il 10% di risparmio." },
  "under35|altro": { livello: 2, msg: "Ripartiamo insieme: in consulenza valutiamo cosa è cambiato dall'ultima volta e da dove ripartire." },
  "35-50|mai": { livello: 1, msg: "È la tua prima volta: partiamo da una seduta e dalla consulenza gratuita. Tra i 35 e i 50 anni la pelle cambia: capire subito cosa le serve fa la differenza." },
  "35-50|qualche_volta": { livello: 2, msg: "Due servizi complementari danno un risultato più visibile e duraturo, con il 5% di risparmio." },
  "35-50|regolarmente": { livello: 3, msg: "Per chi è costante, il percorso completo: risultato pieno, sedute già programmate e il 10% di risparmio." },
  "35-50|altro": { livello: 2, msg: "Ripartiamo insieme: in consulenza valutiamo cosa è cambiato e impostiamo il percorso giusto per questa fase." },
  "over50|mai": { livello: 1, msg: "È la tua prima volta: partiamo da una seduta e dalla consulenza gratuita. Non è mai troppo tardi: la pelle risponde a qualsiasi età, se trattata nel modo giusto." },
  "over50|qualche_volta": { livello: 2, msg: "Dopo i 50 anni l'unione di natura e tecnologia dà i risultati migliori: due servizi complementari, con il 5% di risparmio." },
  "over50|regolarmente": { livello: 3, msg: "Il percorso completo mantiene i risultati nel tempo: sedute programmate e il 10% di risparmio." },
  "over50|altro": { livello: 2, msg: "Ripartiamo insieme: in consulenza valutiamo cosa è cambiato e cosa può fare oggi la tecnologia per la tua pelle." },
  "altro|mai": { livello: 1, msg: "È la tua prima volta: partiamo da una seduta e dalla consulenza gratuita, in cui ti spiego tutto prima di iniziare." },
  "altro|qualche_volta": { livello: 2, msg: "Con due servizi complementari il risultato si vede prima e risparmi il 5%." },
  "altro|regolarmente": { livello: 3, msg: "Per chi si prende cura di sé con costanza, il percorso completo: sedute programmate e il 10% di risparmio." },
  "altro|altro": { livello: 2, msg: "Ripartiamo insieme: in consulenza capiamo da dove ripartire." },
};

const SECONDO = {
  "under35": { main: "pelle-pulita", alt: "liscia-tutto-l-anno" },
  "35-50": { main: "luminosita", alt: "corpo-leggero" },
  "over50": { main: "anti-age-metodo-rosa", alt: "equilibrio" },
  "altro": { main: "pausa-benessere", alt: "luminosita" },
};

const PERCORSI_CORPO = ["corpo-leggero", "corpo-tonico"];

export const d1Label = (id) => D1_OPTIONS.find((o) => o.id === id)?.label || id;
export const d2Label = (d1, id) => D2_OPTIONS[d1]?.find((o) => o.id === id)?.label || id || "–";
export const d3Label = (id) => D3_OPTIONS.find((o) => o.id === id)?.label || id;
export const d4Label = (id) => D4_OPTIONS.find((o) => o.id === id)?.label || id;

export function computeResult({ d1, d2, d3, d4 }) {
  const percorso = d1 === "altro" || !d2 || d2 === "altro" || d2 === "valutazione"
    ? "consulenza"
    : TABLE_A[`${d1}|${d2}`] || "consulenza";
  const b = TABLE_B[`${d3}|${d4}`] || TABLE_B["altro|altro"];
  let msg = b.msg;
  if (PERCORSI_CORPO.includes(percorso)) {
    msg = msg.replaceAll("della pelle", "del corpo").replaceAll("la pelle", "il corpo").replaceAll("pelle", "corpo");
  }
  const sec = SECONDO[d3] || SECONDO["altro"];
  const secondo = percorso === sec.main ? sec.alt : sec.main;
  return { percorso, livello: b.livello, messaggio: msg, secondo };
}

export function buildWhatsAppMessage({ nome, percorsoNome, livello, altroText, d1, d2, d3, d4 }) {
  let msg = percorsoNome
    ? `Ciao, sono ${nome} e ho fatto il quiz sul sito: mi interessa il percorso ${percorsoNome} livello ${livello}. Vorrei la consulenza gratuita.`
    : `Ciao, sono ${nome} e ho fatto il quiz sul sito: vorrei la consulenza gratuita.`;
  if (altroText) msg += ` Ecco cosa cerco: "${altroText}"`;
  msg += `\n(Quiz: ${d1Label(d1)} / ${d2 ? d2Label(d1, d2) : "altro"} / ${d3Label(d3)} / ${d4Label(d4)})`;
  return msg;
}
