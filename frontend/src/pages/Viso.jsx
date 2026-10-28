import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import PercorsoCard from "@/components/PercorsoCard";
import { METODO_ROSA, IMAGES, PRODOTTI } from "@/lib/content";
import { useSite } from "@/lib/siteContext";
import { Sparkles } from "lucide-react";

const Viso = () => {
  const { percorsi, openQuiz } = useSite();
  const percorsiViso = percorsi.filter((p) => p.area === "viso");

  return (
    <div data-testid="viso-page">
      <section className="grain relative overflow-hidden bg-crema">
        <div className="container-site grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <Reveal>
            <p className="eyebrow mb-3">Viso · Metodo Rosa</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
              Il Metodo Rosa: natura e tecnologia per la tua pelle
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">{METODO_ROSA.intro}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="overflow-hidden rounded-[2rem] shadow-lg" style={{ aspectRatio: "4/3" }}>
              <img src={IMAGES.viso} alt="Trattamento viso in cabina al centro Beauty & Care" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-site py-16 lg:py-20">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold text-antracite">Le cinque fasi</h2>
        </Reveal>
        <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {METODO_ROSA.fasi.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-carta p-7">
                <span className="font-serif text-4xl font-semibold text-rosa/40">{f.n}</span>
                <h3 className="mt-3 font-serif text-xl font-semibold text-antracite">{f.titolo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.testo}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <div className="flex h-full flex-col justify-center rounded-3xl bg-rosa-soft p-7">
              <p className="font-serif text-xl font-semibold text-antracite">{METODO_ROSA.principi}</p>
              <p className="mt-3 text-sm text-antracite/70">{METODO_ROSA.nota}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-elevato py-16 lg:py-20">
        <div className="container-site">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-antracite">Le tecnologie viso</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              Plasma freddo, radiofrequenza viso e laser: la tecnologia giusta viene scelta in consulenza, in base alla tua pelle e al tuo obiettivo. Il trattamento di punta è il Rituale Metodo Rosa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-site pb-16 lg:pb-20">
        <Reveal>
          <div className="rounded-[2rem] border border-border bg-carta p-8 lg:p-10">
            <p className="eyebrow mb-3">In vendita in centro</p>
            <h2 className="font-serif text-2xl font-semibold text-antracite sm:text-3xl">La linea alla rosa damascena</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              I prodotti naturali creati da Susana, gli stessi usati in cabina: latte, tonico, siero e crema alla rosa damascena. Per ora li trovi in centro; presto anche online.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {PRODOTTI.map((p) => (
                <figure key={p.nome} className="group overflow-hidden rounded-2xl border border-border bg-crema" data-testid={`prodotto-${p.nome.toLowerCase().replace(/\s/g, "-")}`}>
                  <img src={p.img} alt={p.nome} className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  <figcaption className="px-4 py-3 text-sm font-medium text-muted-foreground">{p.nome}</figcaption>
                </figure>
              ))}
              <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-amber-500/50 bg-crema p-4 text-center" data-testid="prodotto-slot-altri">
                <Placeholder label="altre foto dei prodotti e prezzi di vendita" />
                <p className="text-sm font-medium text-muted-foreground">Altri prodotti della linea</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-site py-16 lg:py-20">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold text-antracite">I percorsi viso</h2>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-2">
          {percorsiViso.map((p, i) => (
            <Reveal key={p.handle} delay={i * 0.08}>
              <PercorsoCard percorso={p} areaNome="Viso e Metodo Rosa" />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <button data-testid="viso-quiz-btn" onClick={openQuiz} className="btn-primary">
              <Sparkles size={18} /> Scopri il percorso viso giusto per te
            </button>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Viso;
