const TITOLARE = "Estetica Beauty & Care di Susana Cabezas Agostino";
const INDIRIZZO = "Via Locarno 58, 6616 Losone (TI), Svizzera";
const IVA = "CHE-181.789.225";
const EMAIL = "esteticabeautycare@hotmail.ch";

const CONTENUTI = {
  privacy: {
    titolo: "Informativa privacy",
    corpo: [
      `Titolare del trattamento: ${TITOLARE}, ${INDIRIZZO} · IVA ${IVA} · ${EMAIL}.`,
      "Questa informativa descrive il trattamento dei dati personali su questo sito, in conformità alla legge svizzera sulla protezione dei dati (nLPD) e, per le clienti dall'Italia, al GDPR.",
      "Dati raccolti dal quiz \"Scopri il tuo percorso\": nome, numero di telefono, risposte alle domande, consensi, data e parametri di provenienza (UTM). Finalità: fornire il risultato del quiz e la consulenza richiesta, e – solo con il consenso facoltativo – l'invio di consigli e novità su WhatsApp.",
      "Dati raccolti dal modulo eventi: nome, numero di telefono, numero di partecipanti ed eventuale messaggio. Finalità: gestione delle iscrizioni all'evento e comunicazioni relative.",
      "I dati inseriti nei moduli vengono usati esclusivamente per rispondere alla richiesta e non vengono ceduti a terzi.",
      "Servizi terzi: la prenotazione online avviene sulla piattaforma Fresha, che tratta i dati secondo la propria informativa (fresha.com/privacy-policy). I messaggi su WhatsApp sono trattati da WhatsApp LLC/Meta secondo la propria informativa.",
      "Statistiche di visita: questo sito raccoglie statistiche anonime di utilizzo (pagine visitate e azioni come l'avvio del quiz), senza cookie di terze parti e senza profilazione pubblicitaria.",
      "Hai diritto di accesso, rettifica e cancellazione dei tuoi dati. Per esercitarli scrivi a " + EMAIL + " o contattaci al +41 79 649 40 05.",
    ],
  },
  condizioni: {
    titolo: "Condizioni di vendita",
    corpo: [
      `Venditore: ${TITOLARE}, ${INDIRIZZO} · IVA ${IVA}.`,
      "I percorsi sono prepagati e hanno validità di 12 mesi dall'acquisto. Ogni percorso inizia con la consulenza inclusa.",
      "Garanzia: se in consulenza emerge che il trattamento non è adatto a te, il valore pagato si converte in un altro percorso o in credito, oppure ti viene rimborsato.",
      "Gli appuntamenti seguono le regole di annullamento di Fresha del centro: puoi gestire o spostare l'appuntamento dal link di conferma, oppure contattandoci il prima possibile al +41 79 649 40 05.",
      "Per Open Day ed eventi: in caso di mancato raggiungimento del numero minimo di partecipanti, l'evento viene rinviato con rimborso o data successiva.",
    ],
  },
  cookie: {
    titolo: "Cookie",
    corpo: [
      "Questo sito non usa cookie di terze parti né strumenti di profilazione pubblicitaria.",
      "Vengono utilizzati solo cookie tecnici e memoria locale del browser, necessari al funzionamento: ad esempio per ricordare che hai già visto il quiz, per mantenere l'accesso all'area riservata e per conservare temporaneamente il risultato del quiz durante la navigazione.",
      "Le statistiche di visita sono raccolte in forma anonima dal sito stesso, senza cookie e senza servizi esterni di misurazione.",
      "Puoi cancellare in qualsiasi momento cookie e dati locali dalle impostazioni del tuo browser.",
    ],
  },
  "note-legali": {
    titolo: "Note legali",
    corpo: [
      `${TITOLARE}`,
      `${INDIRIZZO}`,
      `Numero IVA: ${IVA}`,
      `Telefono e WhatsApp: +41 79 649 40 05 · Email: ${EMAIL}`,
      "Responsabilità: i contenuti di questo sito hanno finalità informativa e non sostituiscono il parere di un professionista sanitario. I risultati dei trattamenti estetici possono variare in base al tipo di pelle e alla risposta individuale: la consulenza preliminare in centro è sempre gratuita. Prezzi e disponibilità aggiornati sono pubblicati sulla pagina Fresha del centro.",
      "Copyright: © 2026 Estetica Beauty & Care, Losone. Testi e immagini sono di proprietà del centro o utilizzati secondo le rispettive licenze. È vietata la riproduzione senza autorizzazione.",
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
      </div>
    </div>
  );
};

export default Legale;
