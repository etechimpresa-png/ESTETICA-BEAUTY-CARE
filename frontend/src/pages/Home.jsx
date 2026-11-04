import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Star, MapPin, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Placeholder from "@/components/Placeholder";
import PercorsoCard from "@/components/PercorsoCard";
import FreshaButton from "@/components/FreshaButton";
import { IMAGES, TECNOLOGIE_CORPO, ORARI, LAVORI_HOME } from "@/lib/content";
import { useSite } from "@/lib/siteContext";

const HeroLine = ({ children, delay }) => (
  <span className="mask-line">
    <motion.span
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

const Home = () => {
  const { settings, percorsi, aree, openQuiz } = useSite();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  const evidenza = percorsi.filter((p) => p.in_evidenza);
  const areaNome = (id) => aree.find((a) => a.id === id)?.nome;

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section ref={heroRef} className="grain relative overflow-hidden bg-crema">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-rosa-soft/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-salvia-soft/70 blur-3xl" />
        <div className="container-site relative grid items-center gap-12 pb-20 pt-14 lg:grid-cols-[1.15fr_1fr] lg:pb-28 lg:pt-24">
          <div>
            <motion.p
              className="eyebrow mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Estetica Beauty &amp; Care · Losone
            </motion.p>
            <h1 className="font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-antracite sm:text-5xl lg:text-6xl">
              <HeroLine delay={0.3}>Corpo e pelle trattati</HeroLine>
              <HeroLine delay={0.45}>con <em className="text-rosa">natura</em> e tecnologia</HeroLine>
              <HeroLine delay={0.6}>certificata.</HeroLine>
            </h1>
            <motion.p
              className="mt-7 max-w-lg leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Sono Susana, Skin Expert Metodo Rosa. Da 21 anni aiuto le donne del Locarnese a sentirsi bene nel proprio corpo, unendo tecnologie certificate e prodotti naturali alla rosa damascena.
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8 }}
            >
              <button data-testid="hero-quiz-btn" onClick={openQuiz} className="btn-primary">
                <Sparkles size={18} /> Scopri il tuo percorso in 1 minuto
              </button>
              <FreshaButton testid="hero-fresha-btn" />
            </motion.div>
          </div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-[2rem] shadow-xl" style={{ aspectRatio: "4/5" }}>
              <motion.img
                src={IMAGES.susana}
                alt="Susana, titolare del centro Beauty & Care di Losone, nella sua cabina"
                className="h-full w-full scale-110 object-cover object-top"
                style={{ y: imgY }}
              />
            </div>
            <div className="absolute -bottom-5 left-5 rounded-2xl border border-border bg-carta/95 px-5 py-3 shadow-lg backdrop-blur">
              <p className="font-serif text-lg font-semibold text-antracite">Susana · Skin Expert</p>
              <p className="text-xs uppercase tracking-[0.25em] text-rosa">Metodo Rosa</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BARRA FIDUCIA - marquee editoriale */}
      <div className="overflow-hidden border-y border-border bg-elevato py-4" aria-label="Elementi di fiducia">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {[0, 1].map((n) => (
            <div key={n} className="flex items-center gap-12 text-[15px] font-medium text-antracite/80" aria-hidden={n === 1}>
              <span>21 anni di esperienza</span>
              <span className="text-rosa">·</span>
              <span>Attestati federali O-LRNIS</span>
              <span className="text-rosa">·</span>
              <span className="inline-flex items-center gap-1.5"><Star size={15} className="fill-[#D4AF37] text-[#D4AF37]" /> 4,8 su Google e Fresha</span>
              <span className="text-rosa">·</span>
              <span>Losone, a 5 minuti da Locarno e Ascona</span>
              <span className="text-rosa">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* BANNER EVENTO NATALE */}
      {settings.open_day_attivo && (
        <section className="container-site pt-16">
          <Reveal>
            <Link to="/evento-natale" data-testid="home-evento-banner" className="group block overflow-hidden rounded-[2rem] shadow-md transition-shadow hover:shadow-xl" style={{ background: "linear-gradient(120deg, #C4E5DD 0%, #DFF0EA 100%)" }}>
              <div className="flex flex-col items-start justify-between gap-5 p-9 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#3f5c57]">Evento · Venerdì 27 novembre, ore 17:30 · Golf Ascona</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#22312e] sm:text-3xl">Christmas Gift Experience</h2>
                  <p className="mt-1.5 text-[15px] text-[#3f5c57]">Aperitivo offerto e omaggio speciale per tutte le partecipanti.</p>
                </div>
                <span className="inline-flex min-h-[52px] shrink-0 items-center gap-2 rounded-full bg-[#22312e] px-7 text-base font-semibold text-[#DFF0EA] transition-transform duration-300 group-hover:-translate-y-0.5">
                  Conferma la tua presenza <ArrowRight size={17} />
                </span>
              </div>
            </Link>
          </Reveal>
        </section>
      )}

      {/* IN EVIDENZA */}
      {evidenza.length > 0 && (
        <section className="container-site py-20 lg:py-24">
          <Reveal>
            <p className="eyebrow mb-3">In evidenza questo mese</p>
            <h2 className="font-serif text-3xl font-semibold text-antracite sm:text-4xl">I percorsi del momento</h2>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
            {evidenza.map((p, i) => (
              <Reveal key={p.handle} delay={i * 0.1}>
                <PercorsoCard percorso={p} areaNome={areaNome(p.area)} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* SPECIALISTA DEL CORPO - bento */}
      <section className="bg-antracite py-20 text-carta lg:py-28">
        <div className="container-site">
          <Reveal>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-salvia">La specializzazione</p>
            <h2 className="max-w-xl font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Il corpo è la mia specializzazione
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              { t: "Gambe leggere e drenaggio", d: "Drenaggio linfatico a fini estetici, pressoterapia e percorsi che restituiscono leggerezza.", big: true },
              { t: "Cellulite e silhouette", d: "Tecnologie certificate e trattamenti manuali, combinati sul tuo obiettivo." },
              { t: "Massaggi e benessere del corpo", d: "Massaggio classico, relax, riflessologia plantare e Reiki." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.12} className={c.big ? "lg:row-span-2" : ""}>
                <Link
                  to="/corpo"
                  data-testid={`home-corpo-card-${i}`}
                  className={`group flex h-full flex-col justify-end rounded-3xl border border-carta/10 bg-[#353230] p-8 transition-colors duration-300 hover:border-rosa/50 ${c.big ? "min-h-[320px]" : "min-h-[220px]"}`}
                >
                  <h3 className="font-serif text-2xl font-semibold">{c.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-carta/70">{c.d}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-rosa transition-transform duration-300 group-hover:translate-x-1">
                    Scopri i trattamenti corpo <ArrowRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="lg:col-span-2">
              <div className="flex h-full flex-wrap content-center items-center gap-3 rounded-3xl border border-carta/10 bg-[#353230] p-8">
                <p className="mb-1 w-full text-xs font-semibold uppercase tracking-[0.25em] text-salvia">Tecnologie certificate</p>
                {TECNOLOGIE_CORPO.map((t) => (
                  <span key={t} className="rounded-full border border-carta/15 px-4 py-2 text-sm font-medium text-carta/85">{t}</span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* METODO ROSA */}
      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] shadow-lg" style={{ aspectRatio: "1/1" }}>
            <img src="/assets/centro/prod-linea-01.jpg" alt="La linea di prodotti alla rosa damascena creata da Susana" className="h-full w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="eyebrow mb-3">Il viso</p>
          <h2 className="font-serif text-3xl font-semibold text-antracite sm:text-4xl">Il Metodo Rosa</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Il protocollo di cura della pelle creato da Susana: tecnologia del centro e linea naturale alla rosa damascena, in cinque fasi adattate a ogni pelle.
          </p>
          <Link to="/viso" data-testid="home-metodo-rosa-link" className="mt-6 inline-flex items-center gap-2 font-semibold text-rosa hover:underline">
            Scopri il Metodo Rosa <ArrowRight size={17} />
          </Link>
        </Reveal>
      </section>

      {/* COME FUNZIONA */}
      <section className="bg-elevato py-20 lg:py-24">
        <div className="container-site">
          <Reveal>
            <h2 className="font-serif text-3xl font-semibold text-antracite sm:text-4xl">Come funziona</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { n: "1", t: "Fai il quiz o scrivici", d: "Un minuto per capire di cosa ha bisogno il tuo corpo o la tua pelle." },
              { n: "2", t: "Consulenza gratuita con Susana", d: "Ci conosciamo, guardiamo la tua pelle e il tuo obiettivo, senza impegno." },
              { n: "3", t: "Il tuo percorso, con sedute programmate", d: "Parti con il piano giusto per te: ogni seduta è già pensata." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="h-full rounded-3xl border border-border bg-carta p-8">
                  <span className="font-serif text-5xl font-semibold text-rosa/40">{s.n}</span>
                  <h3 className="mt-4 font-serif text-xl font-semibold text-antracite">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERIA LAVORI REALI */}
      <section className="container-site py-20 lg:py-24">
        <Reveal>
          <p className="eyebrow mb-3">I lavori del centro</p>
          <h2 className="font-serif text-3xl font-semibold text-antracite sm:text-4xl">Risultati veri, fotografati in cabina</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Prima e dopo reali dei percorsi corpo, del trucco permanente e dei trattamenti sguardo, pubblicati con il consenso delle clienti.
          </p>
        </Reveal>
        <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {LAVORI_HOME.map((l, i) => (
            <Reveal key={l.img} delay={i * 0.06}>
              <figure className="group overflow-hidden rounded-2xl border border-border bg-carta shadow-sm" data-testid={`lavoro-home-${i}`}>
                <img src={l.img} alt={l.didascalia} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                <figcaption className="px-4 py-3 text-sm font-medium text-muted-foreground">{l.didascalia}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RECENSIONI */}
      <section className="container-site py-20 lg:py-24">
        <Reveal>
          <h2 className="font-serif text-3xl font-semibold text-antracite sm:text-4xl">Le parole delle clienti</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="flex h-full flex-col gap-3 rounded-3xl border border-dashed border-amber-500/50 bg-carta p-7">
                <div className="flex gap-0.5 text-[#D4AF37]">{[...Array(5)].map((_, s) => <Star key={s} size={15} className="fill-current" />)}</div>
                <Placeholder label={`recensione Google/Fresha autorizzata n. ${i}`} />
                <p className="text-sm text-muted-foreground">Nome e iniziale della cliente</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6">
          <Placeholder label="link al profilo Google del centro" />
        </div>
      </section>

      {/* CHI È SUSANA */}
      <section className="container-site grid items-center gap-12 pb-20 lg:grid-cols-2 lg:pb-28">
        <Reveal>
          <p className="eyebrow mb-3">Chi ti accoglie</p>
          <h2 className="font-serif text-3xl font-semibold text-antracite sm:text-4xl">Susana, Skin Expert Metodo Rosa</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            21 anni di esperienza, la specializzazione nei trattamenti corpo e una linea propria di prodotti alla rosa damascena. Attestati federali O-LRNIS per laser, cellulite e pigmentazione.
          </p>
          <Link to="/susana" data-testid="home-susana-link" className="mt-6 inline-flex items-center gap-2 font-semibold text-rosa hover:underline">
            Conosci Susana e i suoi attestati <ArrowRight size={17} />
          </Link>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[2rem] shadow-lg" style={{ aspectRatio: "4/3" }}>
            <img src={IMAGES.susana} alt="Susana, Skin Expert Metodo Rosa" className="h-full w-full object-cover object-top" loading="lazy" />
          </div>
        </Reveal>
      </section>

      {/* BANNER BUONI REGALO */}
      {settings.banner_buoni_regalo_attivo && (
        <section className="container-site pb-20">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-rosa-soft p-10 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-antracite sm:text-3xl">Regala un momento per sé</h2>
                <p className="mt-2 max-w-md text-[15px] text-antracite/70">I buoni regalo del centro, anche in busta regalo con un campioncino della linea alla rosa damascena.</p>
              </div>
              <Link to="/buoni-regalo" data-testid="home-gift-banner-btn" className="btn-primary">Scopri i buoni regalo</Link>
            </div>
          </Reveal>
        </section>
      )}

      {/* DOVE SIAMO */}
      <section className="bg-elevato py-20 lg:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">Dove siamo</p>
            <h2 className="font-serif text-3xl font-semibold text-antracite sm:text-4xl">A Losone, a 5 minuti da Locarno e Ascona</h2>
            <p className="mt-5 flex items-start gap-2 text-lg text-antracite">
              <MapPin size={20} className="mt-1 shrink-0 text-rosa" /> Via Locarno 58, 6616 Losone (TI)
            </p>
            <div className="mt-4"><Placeholder label="info parcheggio" /></div>
            <ul className="mt-6 space-y-1.5 text-[15px] text-muted-foreground">
              {ORARI.map((o) => (
                <li key={o.giorno} className="flex gap-4"><span className="w-24">{o.giorno}</span><span className="text-antracite">{o.ore}</span></li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contatti" data-testid="home-contatti-btn" className="btn-primary">Contattaci</Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-5">
              <div className="overflow-hidden rounded-[2rem] border border-border shadow-sm">
                <img
                  src="/assets/centro/cabina-trattamenti.jpg"
                  alt="La cabina trattamenti del centro Beauty & Care a Losone"
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-[2rem] border border-border shadow-sm">
                <iframe
                  title="Mappa: Estetica Beauty & Care, Via Locarno 58, Losone"
                  src="https://www.google.com/maps?q=Via%20Locarno%2058%2C%206616%20Losone%2C%20Svizzera&output=embed"
                  className="h-[300px] w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
