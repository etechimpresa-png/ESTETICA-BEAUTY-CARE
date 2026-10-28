import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import { ATTESTATI, METODO_ROSA, SUSANA_STORIA, SUSANA_COMPETENZE, IMAGES } from "@/lib/content";
import { BadgeCheck } from "lucide-react";

const Susana = () => (
  <div data-testid="susana-page">
    <section className="container-site py-16 lg:py-24">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] shadow-lg" style={{ aspectRatio: "3/4" }}>
            <img src={IMAGES.susana} alt="Susana, titolare ed estetista di Beauty & Care Losone" className="h-full w-full object-cover object-top" />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="eyebrow mb-3">Chi sono</p>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
            Susana · Skin Expert Metodo Rosa
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            {SUSANA_STORIA.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {SUSANA_COMPETENZE.map((c) => (
              <span key={c} className="rounded-full border border-border bg-carta px-4 py-2 text-sm font-medium text-antracite" data-testid="susana-competenza">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <Placeholder label="storia personale completa raccontata da Susana (la aggiungiamo qui)" />
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
          Dal 2024 la legge federale richiede un attestato specifico per i trattamenti con laser e apparecchi. Ecco i miei titoli: perché la tua sicurezza viene prima di tutto.
        </p>
      </Reveal>
      <div className="mt-9 grid gap-5 md:grid-cols-2">
        {ATTESTATI.map((a, i) => (
          <Reveal key={a.titolo} delay={i * 0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-carta p-7 shadow-sm" data-testid={`attestato-card-${i}`}>
              <BadgeCheck size={26} className="text-salvia" />
              <h3 className="mt-4 font-serif text-lg font-semibold leading-snug text-antracite">{a.titolo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.ente}</p>
              <p className="mt-1 text-sm font-medium text-antracite">{a.data}</p>
              <a href={a.img} target="_blank" rel="noopener noreferrer" className="mt-4 block overflow-hidden rounded-2xl border border-border" data-testid={`attestato-img-${i}`}>
                <img src={a.img} alt={`${a.titolo} – documento originale`} className="max-h-80 w-full object-cover object-top transition-transform duration-500 hover:scale-[1.02]" loading="lazy" />
              </a>
              <p className="mt-2 text-xs text-muted-foreground">Documento originale · dati anagrafici oscurati per privacy</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-8 max-w-2xl text-sm text-muted-foreground">
          La registrazione RME (rimborso casse malati complementari) è in corso di rinnovo e verrà pubblicata qui appena aggiornata, insieme agli altri titoli in verifica (Master Reiki, autorizzazioni cantonali).
        </p>
      </Reveal>
    </section>
  </div>
);

export default Susana;
