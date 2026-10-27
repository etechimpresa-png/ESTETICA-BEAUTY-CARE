export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHxfHxzcGElMjB3ZWxsbmVzc3xlbnwwfHx8fDE3OTMwOTIwNzN8MA&ixlib=rb-4.1.0&q=85",
  rosaMacro: "https://images.unsplash.com/photo-1575543483595-568b7afb6b9e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwyfHxyb3NlJTIwc2tpbmNhcmV8ZW58MHx8fHwxNzkzMDkyMDc0fDA&ixlib=rb-4.1.0&q=85",
  massaggio: "https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHw0fHxtYXNzYWdlJTIwdHJlYXRtZW50fGVufDBfHx8fDE3OTMwOTIwNzR8MA&ixlib=rb-4.1.0&q=85",
  pietre: "https://images.unsplash.com/photo-1696841212541-449ca29397cc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxzcGElMjB3ZWxsbmVzc3xlbnwwfHx8fDE3OTMwOTIwNzN8MA&ixlib=rb-4.1.0&q=85",
  rosaFiore: "https://images.unsplash.com/photo-1579053778004-3a4d3f0fae19?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwzfHxyb3NlJTIwc2tpbmNhcmV8ZW58MHx8fHwxNzkzMDkyMDc0fDA&ixlib=rb-4.1.0&q=85",
};

export const TECNOLOGIE_CORPO = [
  "Pressoterapia",
  "Endosfer Endermologia",
  "Cavitazione",
  "Radiofrequenza Triple Action",
  "Sauna Cocoon",
  "Laser a diodo",
];

export const METODO_ROSA = {
  intro:
    "Il Metodo Rosa è il protocollo di cura della pelle creato da Susana, che unisce in ogni trattamento la tecnologia del centro e la sua linea naturale alla rosa damascena. Non è un singolo trattamento, ma il modo in cui Susana lavora: ogni cliente segue le stesse cinque fasi, adattate alla sua pelle.",
  fasi: [
    { n: 1, titolo: "Analisi", testo: "Consulenza e lettura della pelle: tipo, stato, obiettivi, eventuali controindicazioni." },
    { n: 2, titolo: "Preparazione", testo: "Detersione e riequilibrio con latte e tonico alla rosa damascena." },
    { n: 3, titolo: "Trattamento mirato", testo: "La tecnologia giusta per l'obiettivo (plasma freddo, radiofrequenza, laser o trattamento manuale), scelta in consulenza." },
    { n: 4, titolo: "Nutrimento e calma", testo: "Siero e crema alla rosa damascena per lenire e completare il risultato." },
    { n: 5, titolo: "Continuità", testo: "Routine personalizzata da seguire a casa e appuntamento di controllo a 4-6 settimane." },
  ],
  principi: "Tre principi: natura e tecnologia insieme, personalizzazione, continuità.",
  nota: "Trattamenti che seguono il Metodo Rosa: Rituale Metodo Rosa e i percorsi Luminosità, Anti-age Metodo Rosa, Uniformità e Pelle pulita.",
};

export const ATTESTATI = [
  {
    titolo: "Attestato di competenza O-LRNIS – Rimozione peli mediante laser",
    ente: "AESI, Associazione Estetiste della Svizzera Italiana",
    data: "18.11.2024",
    pubblicato: true,
  },
  {
    titolo: "Attestato di competenza O-LRNIS – Cellulite e cuscinetti adiposi",
    ente: "AESI, Associazione Estetiste della Svizzera Italiana",
    data: "18.11.2024",
    pubblicato: true,
  },
  {
    titolo: "Attestato di competenza O-LRNIS – Pelle e pigmentazione",
    ente: "AESI, Associazione Estetiste della Svizzera Italiana",
    data: "13.10.2025",
    pubblicato: true,
  },
];

export const ORARI = [
  { giorno: "Lunedì", ore: "8:30 – 18:30" },
  { giorno: "Martedì", ore: "8:30 – 18:30" },
  { giorno: "Mercoledì", ore: "8:30 – 18:30" },
  { giorno: "Giovedì", ore: "8:30 – 20:00" },
  { giorno: "Venerdì", ore: "8:30 – 18:30" },
  { giorno: "Sabato", ore: "9:00 – 13:00" },
  { giorno: "Domenica", ore: "Chiuso" },
];

export const GARANZIA =
  "Ogni percorso inizia con la consulenza inclusa. Se in consulenza emerge che il trattamento non è adatto a te, il valore pagato si converte in un altro percorso o in credito, oppure ti viene rimborsato.";

// Listino: struttura per famiglie. Le voci con prezzo null mostrano il segnaposto [DA INSERIRE: listino Fresha].
export const LISTINO = [
  {
    famiglia: "Trattamenti corpo manuali", percorso: "corpo-leggero",
    voci: [
      { nome: "Drenaggio linfatico a fini estetici", durata: null, prezzo: 110 },
      { nome: "Trattamento anticellulite", durata: null, prezzo: 160 },
      { nome: "Massaggio corpo", durata: null, prezzo: null },
    ],
  },
  {
    famiglia: "Tecnologie corpo", percorso: "corpo-tonico",
    voci: [
      { nome: "Pressoterapia", durata: null, prezzo: null },
      { nome: "Endosfer Endermologia", durata: null, prezzo: null },
      { nome: "Cavitazione", durata: null, prezzo: 110 },
      { nome: "Radiofrequenza corpo", durata: null, prezzo: 120 },
      { nome: "Radiofrequenza Triple Action", durata: null, prezzo: null },
      { nome: "Sauna Cocoon", durata: null, prezzo: null },
    ],
  },
  {
    famiglia: "Massaggi", percorso: "pausa-benessere",
    voci: [
      { nome: "Massaggio relax", durata: null, prezzo: 110 },
      { nome: "Massaggio classico", durata: null, prezzo: null },
      { nome: "Riflessologia plantare", durata: null, prezzo: null },
    ],
  },
  {
    famiglia: "Olistico", percorso: "equilibrio",
    voci: [
      { nome: "Trattamento olistico (Reiki o suono)", durata: null, prezzo: 90 },
    ],
  },
  {
    famiglia: "Epilazione laser a diodo", percorso: "laser-senza-pensieri",
    voci: [
      { nome: "Zona piccola (a seduta)", durata: null, prezzo: 80 },
      { nome: "Zona media (a seduta)", durata: null, prezzo: null },
      { nome: "Zona grande (a seduta)", durata: null, prezzo: null },
    ],
  },
  {
    famiglia: "Epilazione a cera corpo", percorso: "liscia-tutto-l-anno",
    voci: [
      { nome: "Mezza gamba + bikini + ascelle", durata: null, prezzo: 85 },
      { nome: "Gamba intera", durata: null, prezzo: null },
    ],
  },
  {
    famiglia: "Epilazione a cera viso", percorso: null,
    voci: [
      { nome: "Labbra / mento", durata: null, prezzo: null },
      { nome: "Sopracciglia con cera", durata: null, prezzo: null },
    ],
  },
  {
    famiglia: "Pulizia e trattamenti viso", percorso: "luminosita",
    voci: [
      { nome: "Viso completo", durata: null, prezzo: 70 },
      { nome: "Trattamento viso", durata: null, prezzo: 185 },
      { nome: "Rituale Metodo Rosa", durata: null, prezzo: 175 },
    ],
  },
  {
    famiglia: "Tecnologie viso", percorso: "anti-age-metodo-rosa",
    voci: [
      { nome: "Plasma freddo", durata: null, prezzo: null },
      { nome: "Radiofrequenza viso", durata: null, prezzo: null },
    ],
  },
  {
    famiglia: "Ciglia e sopracciglia", percorso: "sguardo",
    voci: [
      { nome: "Laminazione ciglia", durata: null, prezzo: 110 },
      { nome: "Regolazione sopracciglia", durata: null, prezzo: 30 },
      { nome: "Laminazione sopracciglia", durata: null, prezzo: null },
      { nome: "Microblading sopracciglia (ritocco incluso)", durata: null, prezzo: 450 },
    ],
  },
  {
    famiglia: "Trucco semipermanente", percorso: null,
    voci: [{ nome: "Trucco permanente / semipermanente", durata: null, prezzo: null }],
  },
  {
    famiglia: "Mani e piedi", percorso: "mani-e-piedi",
    voci: [
      { nome: "Manicure", durata: null, prezzo: 75 },
      { nome: "Semipermanente piedi", durata: null, prezzo: 80 },
    ],
  },
  {
    famiglia: "Servizi su richiesta", percorso: null,
    voci: [{ nome: "Trattamenti su richiesta", durata: null, prezzo: null }],
  },
];
