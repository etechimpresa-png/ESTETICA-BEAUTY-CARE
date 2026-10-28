import { Link } from "react-router-dom";
import { Sparkles, ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import { useSite } from "@/lib/siteContext";
import { waLink } from "@/components/WhatsAppFab";
import { IMAGES, LAVORI_CORPO } from "@/lib/content";

const SEZIONI = [
  {
    titolo: "Gambe leggere e drenaggio",
    testo: "Per chi sente le gambe pesanti a fine giornata e vuole una sensazione di leggerezza che dura. Il drenaggio linfatico viene eseguito a fini estetici.",
    tecnologie: ["Drenaggio linfatico manuale a fini estetici", "Pressoterapia", "Endosfer", "Sauna Cocoon"],
    percorsi: ["corpo-leggero"],
  },
  {
    titolo: "Cellulite e cuscinetti",
    testo: "Un lavoro mirato sugli inestetismi della cellulite, che unisce trattamento manuale e tecnologie certificate, scelte insieme in consulenza.",
    tecnologie: ["Trattamento anticellulite", "Cavitazione", "Endermologia", "Radiofrequenza Triple Action"],
    percorsi: ["corpo-leggero", "corpo-tonico"],
  },
  {
    titolo: "Tonicità e silhouette",
    testo: "Per chi vuole lavorare sulla tonicità dei tessuti e sulla silhouette con costanza, con sedute programmate nel tempo.",
    tecnologie: ["Radiofrequenza corpo", "Cavitazione", "Radiofrequenza Triple Action"],
    percorsi: ["corpo-tonico"],
  },
  {
    titolo: "Massaggi e benessere del corpo",
    testo: "Dal massaggio classico alla riflessologia plantare, fino al Reiki: un tempo tutto per te, per sciogliere e ritrovare equilibrio. Susana è Master Reiki.",
    tecnologie: ["Massaggio classico", "Riflessologia plantare", "Massaggio relax", "Reiki"],
    percorsi: ["pausa-benessere", "equilibrio"],
  },
  {
    titolo: "Epilazione definitiva",
    testo: "Laser a diodo con attestato federale O-LRNIS: una soluzione duratura ai peli superflui, in sicurezza e con un piano chiaro fin dalla consulenza.",
    tecnologie: ["Laser a diodo (attestato federale O-LRNIS)"],
    percorsi: ["laser-senza-pensieri"],
  },
];

const Corpo = () => {
  const { settings, percorsoByHandle, openQuiz } = useSite();

  return (
    <div data-testid="corpo-page">
      <section className="grain relative overflow-hidden bg-crema">
        <div className="container-site grid items-center gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
          <Reveal>
            <p className="eyebrow mb-3">Trattamenti corpo · Losone</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
              Trattamenti corpo a Losone: tecnologia certificata e mani esperte
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Il corpo è la mia specializzazione. Ogni trattamento inizia con una consulenza gratuita: capiamo insieme il tuo obiettivo e scegliamo la combinazione giusta di tecnologie e trattamenti manuali.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[2rem] shadow-lg" style={{ aspectRatio: "4/3" }}>
              <img src={IMAGES.massaggio} alt="Cabina corpo del centro con macchinario per i trattamenti" className="h-full w-full object-cover" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PRIMA E DOPO - subito dopo l'introduzione */}
      <section className="container-site py-14 lg:py-20">
        <Reveal>
          <div className="rounded-[2rem] border border-border bg-carta p-8 lg:p-12">
            <h2 className="font-serif text-2xl font-semibold text-antracite sm:text-3xl">Prima e dopo: i risultati dei percorsi corpo</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Foto reali fatte in cabina, pubblicate con il consenso delle clienti. Ogni corpo è diverso: i tempi e i risultati si valutano in consulenza.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {LAVORI_CORPO.map((l, i) => (
                <figure key={l.img} className="group overflow-hidden rounded-2xl border border-border" data-testid={`corpo-lavoro-${i}`}>
                  <img src={l.img} alt={l.didascalia} className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                  <figcaption className="px-3 py-2.5 text-xs font-medium text-muted-foreground">{l.didascalia}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="container-site space-y-8 py-16 lg:py-20">
        {SEZIONI.map((s, i) => (
          <Reveal key={s.titolo}>
            <article className="rounded-[2rem] border border-border bg-carta p-8 shadow-sm lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-antracite sm:text-3xl">{s.titolo}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{s.testo}</p>
                  <p className="mt-4 text-[15px] text-muted-foreground">
                    Quante sedute servono di solito: <Placeholder label="indicazione di Susana" className="ml-1" />
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {s.percorsi.map((h) => {
                      const p = percorsoByHandle(h);
                      return p ? (
                        <Link key={h} to={`/percorsi/${h}`} data-testid={`corpo-percorso-${h}`} className="btn-secondary">
                          Vai al percorso {p.nome}
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-salvia">Tecnologie e trattamenti</p>
                  {s.tecnologie.map((t) => (
                    <details key={t} className="group rounded-2xl border border-border bg-crema" data-testid={`corpo-tech-${i}-${t.replace(/\s/g, "-").toLowerCase()}`}>
                      <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between px-5 py-3 text-[15px] font-semibold text-antracite">
                        {t}
                        <ChevronDown size={17} className="transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <div className="px-5 pb-4 text-sm text-muted-foreground">
                        <Placeholder label={`testo validato da Susana per ${t} (nome commerciale esatto dell'apparecchio)`} />
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}

        {/* PRIMA E DOPO */}
        {settings.rme_valido && (
          <Reveal>
            <div className="rounded-[2rem] bg-salvia-soft p-8 lg:p-10">
              <h2 className="font-serif text-2xl font-semibold text-antracite">Rimborso dalla cassa malati complementare</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-antracite/80">
                Susana è terapista registrata RME per massaggio classico, riflessologia plantare e drenaggio linfatico manuale. Molte assicurazioni complementari rimborsano parte di questi trattamenti: verifica con la tua cassa malati.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-[2rem] bg-antracite p-10 text-center text-carta">
            <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Non sai da dove partire?</h2>
            <p className="max-w-md text-carta/70">Un minuto di quiz e ti indico il percorso corpo giusto per te.</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <button data-testid="corpo-quiz-btn" onClick={openQuiz} className="btn-primary">
                <Sparkles size={18} /> Scopri il percorso corpo giusto per te
              </button>
              {settings.whatsapp_number ? (
                <a data-testid="corpo-whatsapp-btn" href={waLink(settings.whatsapp_number, "Ciao, vorrei informazioni sui trattamenti corpo.")} target="_blank" rel="noopener noreferrer" className="btn-secondary border-carta/40 text-carta hover:bg-carta/10">
                  Scrivici su WhatsApp
                </a>
              ) : (
                <Placeholder label="numero WhatsApp dedicato" />
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Corpo;
