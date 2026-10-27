import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShieldCheck, ChevronDown, ShoppingBag, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import { getPercorso } from "@/lib/api";
import { GARANZIA } from "@/lib/content";
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
    <button
      data-testid={`livello-${livello.n}-add-cart`}
      className="btn-primary mt-6 w-full cursor-not-allowed opacity-60"
      title="La vendita online arriva con il collegamento Shopify (Fase 4)"
    >
      <ShoppingBag size={17} /> Aggiungi al carrello
    </button>
    <p className="mt-2 text-center text-xs text-muted-foreground">Vendita online in arrivo (collegamento Shopify)</p>
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
          <h2 className="font-serif text-2xl font-semibold text-antracite">Come funziona dopo l'acquisto</h2>
          <ol className="mt-5 space-y-3 text-muted-foreground">
            <li><strong className="text-antracite">1.</strong> Paghi online, in sicurezza.</li>
            <li><strong className="text-antracite">2.</strong> Prenoti su Fresha la consulenza inclusa come primo appuntamento.</li>
            <li><strong className="text-antracite">3.</strong> Dalla seconda seduta prenoti le sedute successive su Fresha.</li>
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

      <Reveal>
        <div className="mt-14 flex items-start gap-4 rounded-[2rem] bg-salvia-soft p-8">
          <ShieldCheck size={30} className="mt-1 shrink-0 text-[#4c5c48]" />
          <p className="leading-relaxed text-antracite/85">{GARANZIA}</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          {settings.whatsapp_number ? (
            <a
              data-testid="percorso-whatsapp-btn"
              href={waLink(settings.whatsapp_number, `Ciao, ho una domanda sul percorso ${p.nome}.`)}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
            >
              Ho una domanda su questo percorso
            </a>
          ) : (
            <Placeholder label="numero WhatsApp dedicato" />
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
