import Reveal from "@/components/Reveal";
import PercorsoCard from "@/components/PercorsoCard";
import { GARANZIA } from "@/lib/content";
import { useSite } from "@/lib/siteContext";
import { ShieldCheck } from "lucide-react";

const Percorsi = () => {
  const { percorsi, aree } = useSite();
  const evidenza = percorsi.filter((p) => p.in_evidenza);

  return (
    <div data-testid="percorsi-page">
      <section className="container-site py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow mb-3">I percorsi</p>
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
            Più servizi insieme, un risultato più completo
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
            Ogni percorso inizia con la consulenza inclusa. Scegli l'area che ti sta a cuore: al resto pensiamo insieme.
          </p>
        </Reveal>

        {evidenza.length > 0 && (
          <div className="mt-14">
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold text-rosa">In evidenza questo mese</h2>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
              {evidenza.map((p) => (
                <PercorsoCard key={p.handle} percorso={p} areaNome={aree.find((a) => a.id === p.area)?.nome} />
              ))}
            </div>
          </div>
        )}

        {aree.map((area) => {
          const lista = percorsi.filter((p) => p.area === area.id);
          if (!lista.length) return null;
          return (
            <div key={area.id} className="mt-16">
              <Reveal>
                <h2 className="font-serif text-2xl font-semibold text-antracite sm:text-3xl">{area.nome}</h2>
              </Reveal>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {lista.map((p, i) => (
                  <Reveal key={p.handle} delay={i * 0.06}>
                    <PercorsoCard percorso={p} areaNome={area.nome} />
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}

        <Reveal>
          <div className="mt-20 flex items-start gap-4 rounded-[2rem] bg-salvia-soft p-8">
            <ShieldCheck size={30} className="mt-1 shrink-0 text-[#4c5c48]" />
            <p className="leading-relaxed text-antracite/85">{GARANZIA}</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Percorsi;
