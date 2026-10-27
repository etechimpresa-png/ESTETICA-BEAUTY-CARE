import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import FreshaButton from "@/components/FreshaButton";
import { LISTINO } from "@/lib/content";
import { useSite } from "@/lib/siteContext";

const Servizi = () => {
  const { percorsoByHandle } = useSite();

  return (
    <div data-testid="servizi-page" className="container-site py-16 lg:py-24">
      <Reveal>
        <p className="eyebrow mb-3">Listino</p>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
          Tutti i servizi del centro
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
          Il listino completo, raggruppato per famiglia. Ogni servizio si prenota su Fresha.
        </p>
        <div className="mt-4">
          <Placeholder label="esportazione del listino Fresha completo (66 voci), senza refusi" />
        </div>
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
                        {v.prezzo != null ? (
                          <span className="font-semibold text-antracite">CHF {v.prezzo}</span>
                        ) : (
                          <Placeholder label="prezzo dal listino Fresha" />
                        )}
                        <FreshaButton label="Prenota su Fresha" kind="fresha" testid={`servizi-fresha-${fi}-${vi}`} className="btn-secondary !min-h-[44px] !px-5 !py-2 text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
};

export default Servizi;
