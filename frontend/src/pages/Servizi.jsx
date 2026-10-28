import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import FreshaButton from "@/components/FreshaButton";
import { LISTINO, FRESHA_URL } from "@/lib/content";
import { trackEvent } from "@/lib/api";
import { useSite } from "@/lib/siteContext";

const Prezzo = ({ prezzo }) => {
  if (prezzo == null) return null;
  if (prezzo === "gratuita") return <span className="font-semibold text-[#4c5c48]">Gratuita</span>;
  if (typeof prezzo === "string") return <span className="font-semibold text-antracite">da CHF {prezzo.replace("da ", "")}</span>;
  return <span className="font-semibold text-antracite">CHF {prezzo}</span>;
};

const Servizi = () => {
  const { percorsoByHandle } = useSite();
  const totale = LISTINO.reduce((n, f) => n + f.voci.length, 0);

  return (
    <div data-testid="servizi-page" className="container-site py-16 lg:py-24">
      <Reveal>
        <p className="eyebrow mb-3">Listino</p>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
          Tutti i servizi del centro
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
          Il listino completo, con prezzi e durate come su Fresha. Ogni servizio si prenota online in un minuto.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{totale} servizi · prezzi aggiornati da Fresha</p>
      </Reveal>

      <div className="mt-14 space-y-12">
        {LISTINO.map((fam, fi) => {
          const percorso = fam.percorso ? percorsoByHandle(fam.percorso) : null;
          return (
            <Reveal key={fam.famiglia}>
              <section data-testid={`servizi-famiglia-${fi}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-serif text-2xl font-semibold text-antracite">{fam.famiglia}</h2>
                  {percorso && (
                    <Link to={`/percorsi/${percorso.handle}`} data-testid={`servizi-percorso-${percorso.handle}`} className="text-[15px] font-semibold text-rosa hover:underline">
                      Percorso collegato: {percorso.nome} →
                    </Link>
                  )}
                </div>
                <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-carta">
                  {fam.voci.map((v, vi) => (
                    <div
                      key={v.nome}
                      className={`flex flex-wrap items-center justify-between gap-3 px-6 py-4 ${vi > 0 ? "border-t border-border/70" : ""}`}
                    >
                      <div>
                        <p className="font-medium text-antracite">{v.nome}</p>
                        {v.durata && <p className="text-sm text-muted-foreground">{v.durata}</p>}
                      </div>
                      <div className="flex items-center gap-4">
                        <Prezzo prezzo={v.prezzo} />
                        <a
                          data-testid={`servizi-fresha-${fi}-${vi}`}
                          href={FRESHA_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary !min-h-[44px] !px-5 !py-2 text-sm"
                          onClick={() => trackEvent("fresha_click")}
                        >
                          Prenota su Fresha
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <div className="mt-16 text-center">
          <FreshaButton label="Prenota il tuo appuntamento su Fresha" testid="servizi-fresha-bottom" className="btn-primary" />
        </div>
      </Reveal>
    </div>
  );
};

export default Servizi;
