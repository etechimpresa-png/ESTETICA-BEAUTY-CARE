import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import { ATTESTATI, METODO_ROSA } from "@/lib/content";
import { BadgeCheck } from "lucide-react";

const Susana = () => (
  <div data-testid="susana-page">
    <section className="container-site py-16 lg:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-amber-500/50 bg-elevato">
            <Placeholder label="foto di Susana (giornata di shooting)" />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="eyebrow mb-3">Chi sono</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
            Susana · Skin Expert Metodo Rosa
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Estetista da 21 anni, specializzata nei trattamenti corpo. Nel mio centro di Losone unisco tecnologie certificate e una linea naturale di prodotti alla rosa damascena, creata da me.
            </p>
            <Placeholder label="testo approvato da Susana sulla sua storia (versione lunga)" />
          </div>
        </Reveal>
      </div>
    </section>

    <section className="bg-rosa-soft/50 py-16 lg:py-20">
      <div className="container-site">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold text-antracite">Il Metodo Rosa</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-antracite/80">{METODO_ROSA.intro}</p>
        </Reveal>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {METODO_ROSA.fasi.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.07}>
              <div className="h-full rounded-2xl bg-carta p-5 shadow-sm">
                <span className="font-serif text-3xl font-semibold text-rosa/50">{f.n}</span>
                <h3 className="mt-2 font-serif text-lg font-semibold text-antracite">{f.titolo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.testo}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">{METODO_ROSA.principi} {METODO_ROSA.nota}</p>
        </Reveal>
      </div>
    </section>

    <section className="container-site py-16 lg:py-20">
      <Reveal>
        <h2 className="font-serif text-3xl font-semibold text-antracite">Attestati e certificazioni</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Dal 2024 la legge federale richiede un attestato specifico per i trattamenti con laser e apparecchi. Qui trovi tutti i miei titoli: perché la tua sicurezza viene prima di tutto.
        </p>
      </Reveal>
      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {ATTESTATI.map((a, i) => (
          <Reveal key={a.titolo} delay={i * 0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-carta p-7 shadow-sm" data-testid={`attestato-card-${i}`}>
              <BadgeCheck size={26} className="text-salvia" />
              <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-antracite">{a.titolo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.ente}</p>
              <p className="mt-1 text-sm font-medium text-antracite">{a.data}</p>
              <div className="mt-4 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-amber-500/50 bg-crema p-6">
                <Placeholder label={`scansione del documento (dati personali oscurati) – ${a.titolo.slice(0, 40)}…`} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          Altri titoli (registrazione RME, Master Reiki, autorizzazioni cantonali) saranno pubblicati qui dopo la verifica e il rinnovo dei documenti.
        </p>
      </Reveal>
    </section>
  </div>
);

export default Susana;
