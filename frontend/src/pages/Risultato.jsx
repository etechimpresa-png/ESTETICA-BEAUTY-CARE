import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, Gift, TicketPercent } from "lucide-react";
import Reveal from "@/components/Reveal";
import FreshaButton from "@/components/FreshaButton";
import PercorsoCard from "@/components/PercorsoCard";
import { LivelloCard } from "./PercorsoDetail";
import { GARANZIA } from "@/lib/content";
import { useSite } from "@/lib/siteContext";
import { waLink } from "@/components/WhatsAppFab";

const Risultato = () => {
  const { settings, percorsoByHandle, openQuiz } = useSite();
  const [result, setResult] = useState(undefined);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("bc_quiz_result");
      setResult(raw ? JSON.parse(raw) : null);
    } catch {
      setResult(null);
    }
  }, []);

  if (result === undefined) return null;

  if (!result) {
    return (
      <div data-testid="risultato-empty" className="container-site py-24 text-center">
        <h1 className="font-serif text-3xl font-semibold text-antracite">Il tuo risultato ti aspetta</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">Fai il quiz di un minuto e ti mostro subito il percorso che Susana ti consiglia.</p>
        <button data-testid="risultato-open-quiz" onClick={openQuiz} className="btn-primary mt-8">
          <Sparkles size={18} /> Inizia il quiz
        </button>
      </div>
    );
  }

  const percorso = result.percorso !== "consulenza" ? percorsoByHandle(result.percorso) : null;
  const secondo = percorsoByHandle(result.secondo_percorso);
  const isConsulenza = !percorso;
  const waHref = settings.whatsapp_number ? waLink(settings.whatsapp_number, result.waMsg) : null;

  return (
    <div data-testid="risultato-page" className="container-site py-14 lg:py-20">
      <Reveal>
        <p className="eyebrow mb-3">Il tuo risultato</p>
        {isConsulenza ? (
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
            Ciao {result.nome}, per te la cosa migliore è parlarne con Susana
          </h1>
        ) : (
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
            Ciao {result.nome}, ecco il percorso che Susana ti consiglia: <span className="text-rosa">{percorso.nome}</span>
          </h1>
        )}
        <p data-testid="risultato-messaggio" className="mt-6 max-w-2xl rounded-3xl border border-border bg-carta p-7 font-serif text-xl italic leading-relaxed text-antracite shadow-sm">
          “{result.messaggio}”
        </p>
      </Reveal>

      {!isConsulenza && (
        <>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {percorso.livelli.map((l) => (
              <Reveal key={l.n} delay={l.n * 0.08}>
                <LivelloCard livello={l} consigliato={l.n === result.livello} scontoAttivo={settings.sconto_quiz_attivo && l.n === 1} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-rosa-soft/60 p-6">
              {result.livello === 1 && settings.sconto_quiz_attivo ? (
                <>
                  <TicketPercent size={24} className="mt-0.5 shrink-0 text-rosa" />
                  <p className="text-antracite/85">
                    <strong>Il tuo vantaggio:</strong> con il codice <strong>QUIZ10</strong> hai il 10% sul primo trattamento (livello 1): lo applichiamo alla tua prima prenotazione.
                  </p>
                </>
              ) : (
                <>
                  <Gift size={24} className="mt-0.5 shrink-0 text-rosa" />
                  <p className="text-antracite/85">
                    <strong>Il tuo vantaggio:</strong> in omaggio un prodotto della linea alla rosa damascena in formato viaggio.
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </>
      )}

      <Reveal>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {waHref && (
            <a data-testid="risultato-whatsapp-btn" href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Ricevi ora la tua consulenza gratuita
            </a>
          )}
          <FreshaButton label="Preferisco prenotare direttamente la consulenza" testid="risultato-fresha-btn" />
        </div>
      </Reveal>

      {secondo && (
        <Reveal>
          <div className="mt-14">
            <h2 className="font-serif text-2xl font-semibold text-antracite">Ti potrebbe interessare anche</h2>
            <div className="mt-5 max-w-sm">
              <PercorsoCard percorso={secondo} small />
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
    </div>
  );
};

export default Risultato;
