import Reveal from "@/components/Reveal";
import FreshaButton from "@/components/FreshaButton";
import { Gift } from "lucide-react";

const OCCASIONI = ["Natale", "San Valentino", "Festa della mamma", "Compleanno"];
const IDEE = ["Pausa benessere", "Rituale Metodo Rosa", "Un valore a scelta"];

const BuoniRegalo = () => (
  <div data-testid="buoni-regalo-page" className="container-site py-16 lg:py-24">
    <Reveal>
      <p className="eyebrow mb-3">Buoni regalo</p>
      <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
        Regala un momento per sé
      </h1>
      <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
        Un buono regalo di Beauty &amp; Care è un pensiero che si ricorda: tempo, cura e attenzione per chi lo riceve.
      </p>
    </Reveal>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {OCCASIONI.map((o, i) => (
        <Reveal key={o} delay={i * 0.07}>
          <div className="flex h-full flex-col items-start gap-3 rounded-3xl border border-border bg-carta p-7">
            <Gift size={22} className="text-rosa" />
            <h2 className="font-serif text-xl font-semibold text-antracite">{o}</h2>
          </div>
        </Reveal>
      ))}
    </div>

    <Reveal>
      <div className="mt-12 rounded-[2rem] bg-rosa-soft/60 p-8 lg:p-10">
        <h2 className="font-serif text-2xl font-semibold text-antracite">Idee di valore</h2>
        <ul className="mt-4 space-y-2 text-antracite/80">
          {IDEE.map((i) => <li key={i}>· {i}</li>)}
        </ul>
        <div className="mt-7">
          <FreshaButton label="Acquista il buono regalo" kind="buoni" testid="buoni-fresha-btn" className="btn-primary" />
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          Disponibile anche in busta regalo presso il centro, con un campioncino della linea alla rosa damascena.
        </p>
      </div>
    </Reveal>
  </div>
);

export default BuoniRegalo;
