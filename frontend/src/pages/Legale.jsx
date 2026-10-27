import Placeholder from "@/components/Placeholder";

const CONTENUTI = {
  privacy: {
    titolo: "Informativa privacy",
    corpo: [
      "Questa informativa descrive il trattamento dei dati personali sul sito di Estetica Beauty & Care – Losone, in conformità alla legge svizzera sulla protezione dei dati (nLPD) e, per le clienti dall'Italia, al GDPR.",
      "Dati raccolti dal quiz: nome, numero di telefono, risposte alle domande, consensi, data e parametri di provenienza (UTM). Finalità: fornire il risultato del quiz e la consulenza richiesta, e – solo con il consenso facoltativo – l'invio di consigli e novità su WhatsApp.",
      "Servizi terzi coinvolti: WhatsApp Business (tramite Zepic), Shopify (catalogo e ordini), Fresha (prenotazioni), Meta e Google (misurazione, attiva solo dopo il consenso cookie).",
      "Hai diritto di accesso, rettifica e cancellazione dei tuoi dati. Per esercitarli, contatta il centro.",
    ],
  },
  condizioni: {
    titolo: "Condizioni di vendita",
    corpo: [
      "I percorsi sono prepagati e hanno validità di 12 mesi dall'acquisto. Ogni percorso inizia con la consulenza inclusa.",
      "Garanzia: se in consulenza emerge che il trattamento non è adatto a te, il valore pagato si converte in un altro percorso o in credito, oppure ti viene rimborsato.",
      "Gli appuntamenti seguono le regole di annullamento di Fresha del centro. Per i prodotti valgono le condizioni di reso indicate al momento dell'acquisto. Per Open Day e masterclass: in caso di mancato raggiungimento del numero minimo di partecipanti, l'evento viene rinviato con rimborso o data successiva.",
    ],
  },
  cookie: {
    titolo: "Cookie",
    corpo: [
      "Questo sito usa cookie tecnici necessari al funzionamento. I cookie di misurazione (Meta Pixel e Google Analytics 4) si attivano solo dopo il tuo consenso tramite il banner.",
      "Puoi modificare o revocare il consenso in qualsiasi momento.",
    ],
  },
  "note-legali": {
    titolo: "Note legali",
    corpo: [
      "Estetica Beauty & Care – Losone, Via Locarno 58, 6616 Losone (TI), Svizzera.",
      "Per qualsiasi domanda sul sito e sui contenuti, contatta il centro.",
    ],
  },
};

const Legale = ({ tipo }) => {
  const c = CONTENUTI[tipo];
  return (
    <div data-testid={`legale-${tipo}-page`} className="container-site max-w-3xl py-16 lg:py-24">
      <p className="eyebrow mb-3">Beauty &amp; Care · Losone</p>
      <h1 className="font-serif text-4xl font-semibold text-antracite">{c.titolo}</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-muted-foreground">
        {c.corpo.map((p, i) => <p key={i}>{p}</p>)}
        <Placeholder label={`dati legali del centro per la pagina "${c.titolo}"`} />
      </div>
    </div>
  );
};

export default Legale;
