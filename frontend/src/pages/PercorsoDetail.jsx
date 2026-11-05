import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShieldCheck, ChevronDown, CalendarCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getPercorso } from "@/lib/api";
import { GARANZIA, LAVORI_SGUARDO, FRESHA_URL } from "@/lib/content";
import { useSite } from "@/lib/siteContext";
import { waLink } from "@/components/WhatsAppFab";

export const LivelloCard = ({ livello, consigliato, scontoAttivo }) => (
  <div
    data-testid={`livello-card-${livello.n}`}
    className={`relative flex h-full flex-col rounded-3xl border p-7 ${
      consigliato ? "border-rosa bg-rosa-soft/50 shadow-lg" : "border-border bg-carta shadow-sm"
    }`}
  >
    {consigliato && (
      <span className="absolute -top-3.5 left-6 rounded-full bg-rosa px-4 py-1 text-xs font-bold uppercase tracking-wider text-carta">
        Consigliato per te
      </span>
    )}
    <h3 className="font-serif text-xl font-semibold text-antracite">{livello.titolo}</h3>
    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">{livello.servizi}</p>
    {livello.opzioni && <p className="mt-2 text-xs text-muted-foreground">{livello.opzioni}</p>}
    <div className="mt-5">
      <span className="font-serif text-3xl font-semibold text-antracite">CHF {livello.prezzo}</span>
      {livello.prezzo_pieno && (
        <span className="ml-3 text-sm text-muted-foreground">
          valore CHF {livello.prezzo_pieno} · risparmi CHF {livello.prezzo_pieno - livello.prezzo}
        </span>
      )}
    </div>
    {livello.n === 1 && scontoAttivo && (
      <p className="mt-2 text-sm font-semibold text-rosa">Con il quiz: -10% con il codice QUIZ10</p>
    )}
    {(livello.n === 2 || livello.n === 3) && (
      <p className="mt-2 text-sm font-medium text-[#4c5c48]">In omaggio un prodotto della linea in formato viaggio</p>
    )}
    <a
      data-testid={`livello-${livello.n}-prenota-btn`}
      href={FRESHA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary mt-6 w-full"
    >
      <CalendarCheck size={17} /> Prenota su Fresha
    </a>
    <p className="mt-2 text-center text-xs text-muted-foreground">Prenotazione online sicura, in un minuto</p>
  </div>
);

const PercorsoDetail = () => {
  const { handle } = useParams();
  const { settings, openQuiz } = useSite();
  const [p, setP] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setP(null);
    setNotFound(false);
    getPercorso(handle).then(setP).catch(() => setNotFound(true));
  }, [handle]);

  if (notFound) {
    return (
      <div className="container-site py-24 text-center">
        <h1 className="font-serif text-3xl text-antracite">Percorso non trovato</h1>
        <Link to="/percorsi" className="btn-primary mt-6">Vedi tutti i percorsi</Link>
      </div>
    );
  }
  if (!p) return <div className="container-site py-24 text-muted-foreground">Caricamento…</div>;

  return (
    <div data-testid="percorso-detail-page" className="container-site py-14 lg:py-20">
      <Reveal>
        <p className="eyebrow mb-3">Percorso n. {p.numero}</p>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">{p.nome}</h1>
        <p className="mt-4 max-w-xl font-serif text-xl italic text-rosa">{p.promessa}</p>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{p.adatto_a}</p>
      </Reveal>

      <Reveal>
        <h2 className="mt-14 font-serif text-2xl font-semibold text-antracite sm:text-3xl">Scegli il tuo livello</h2>
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {p.livelli.map((l) => (
          <Reveal key={l.n} delay={l.n * 0.08}>
            <LivelloCard livello={l} consigliato={l.n === 2} scontoAttivo={settings.sconto_quiz_attivo} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 rounded-[2rem] bg-elevato p-8 lg:p-10">
          <h2 className="font-serif text-2xl font-semibold text-antracite">Come funziona</h2>
          <ol className="mt-5 space-y-3 text-muted-foreground">
            <li><strong className="text-antracite">1.</strong> Prenoti su Fresha il livello scelto.</li>
            <li><strong className="text-antracite">2.</strong> Il primo appuntamento è la consulenza inclusa: valutiamo insieme il tuo obiettivo.</li>
            <li><strong className="text-antracite">3.</strong> Le sedute successive si prenotano su Fresha, con calma e senza pensieri.</li>
          </ol>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12">
          <h2 className="font-serif text-2xl font-semibold text-antracite">Tecnologie e trattamenti usati</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {p.tecnologie.map((t) => (
              <span key={t} className="rounded-full border border-border bg-carta px-4 py-2 text-[15px] font-medium text-antracite">{t}</span>
            ))}
          </div>
        </div>
      </Reveal>

      {p.protocolli && (
        <Reveal>
          <div className="mt-16 rounded-[2rem] border border-salvia/40 bg-salvia-soft/60 p-8 lg:p-10" data-testid="protocolli-benessere">
            <h2 className="font-serif text-2xl font-semibold text-antracite sm:text-3xl">{p.protocolli.titolo}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-antracite/80">{p.protocolli.intro}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {p.protocolli.elenco.map((pr, i) => (
                <div key={pr.nome} className="flex h-full flex-col rounded-3xl border border-border bg-carta p-7 shadow-sm" data-testid={`protocollo-${i}`}>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-serif text-xl font-semibold text-antracite">{pr.nome}</h3>
                    <span className="rounded-full bg-elevato px-3 py-1 text-xs font-semibold text-antracite">{pr.durata}</span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{pr.composizione}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-antracite/85"><strong>Obiettivo:</strong> {pr.obiettivo}</p>
                  <p className="mt-2 text-sm text-muted-foreground"><strong>Frequenza consigliata:</strong> {pr.frequenza}</p>
                  <div className="mt-5 flex-1" />
                  <span className="font-serif text-2xl font-semibold text-antracite">CHF {pr.prezzo}</span>
                  <a
                    data-testid={`protocollo-${i}-prenota-btn`}
                    href={FRESHA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-4 w-full"
                  >
                    <CalendarCheck size={17} /> Prenota su Fresha
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {p.faq?.length > 0 && (
        <Reveal>
          <div className="mt-12 max-w-3xl">
            <h2 className="font-serif text-2xl font-semibold text-antracite">Domande frequenti</h2>
            <div className="mt-5 space-y-3">
              {p.faq.map((f, i) => (
                <details key={i} className="group rounded-2xl border border-border bg-carta" data-testid={`faq-item-${i}`}>
                  <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between px-5 py-3 font-semibold text-antracite">
                    {f.d}
                    <ChevronDown size={17} className="transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="px-5 pb-4 text-[15px] leading-relaxed text-muted-foreground">{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {p.handle === "sguardo" && (
        <Reveal>
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-antracite">I lavori sullo sguardo</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Foto reali fatte in cabina: trucco permanente labbra, laminazione e definizione delle sopracciglia.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-3">
              {LAVORI_SGUARDO.map((l, i) => (
                <figure key={l.img} className="group overflow-hidden rounded-2xl border border-border bg-carta" data-testid={`sguardo-lavoro-${i}`}>
                  <img src={l.img} alt={l.didascalia} className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  <figcaption className="px-3 py-2.5 text-xs font-medium text-muted-foreground">{l.didascalia}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      <Reveal>
        <div className="mt-14 flex items-start gap-4 rounded-[2rem] bg-salvia-soft p-8">
          <ShieldCheck size={30} className="mt-1 shrink-0 text-[#4c5c48]" />
          <p className="leading-relaxed text-antracite/85">{GARANZIA}</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          {settings.whatsapp_number && (
            <a
              data-testid="percorso-whatsapp-btn"
              href={waLink(settings.whatsapp_number, `Ciao, ho una domanda sul percorso ${p.nome}.`)}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
            >
              Ho una domanda su questo percorso
            </a>
          )}
          <button data-testid="percorso-quiz-btn" onClick={openQuiz} className="btn-secondary">
            <Sparkles size={17} /> Fai il quiz
          </button>
        </div>
      </Reveal>
    </div>
  );
};

export default PercorsoDetail;
