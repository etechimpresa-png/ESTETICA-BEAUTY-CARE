import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Globe, CalendarCheck, Map, MessageCircle, Gift } from "lucide-react";
import { LogoMark } from "@/components/Logo";
import Placeholder from "@/components/Placeholder";
import FreshaButton from "@/components/FreshaButton";
import { useSite } from "@/lib/siteContext";
import { waLink } from "@/components/WhatsAppFab";

const LinkBio = () => {
  const { settings, openQuiz } = useSite();

  const item = "flex min-h-[56px] w-full items-center justify-center gap-3 rounded-2xl border border-border bg-carta px-6 text-[17px] font-semibold text-antracite shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-md";

  return (
    <div data-testid="link-page" className="grain relative min-h-screen bg-crema">
      <div className="mx-auto flex max-w-md flex-col items-center px-5 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-rosa/30 bg-elevato">
            <LogoMark className="h-14 w-14" />
            <span className="absolute bottom-1 right-1"><Placeholder label="foto" /></span>
          </div>
          <h1 className="mt-5 font-serif text-2xl font-semibold text-antracite">Susana · Skin Expert</h1>
          <p className="mt-1 text-sm uppercase tracking-[0.3em] text-rosa">Metodo Rosa · Losone</p>
        </motion.div>

        <motion.div
          className="mt-9 flex w-full flex-col gap-3.5"
          initial="hidden" animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {[
            <motion.button key="q" data-testid="link-quiz-btn" onClick={openQuiz} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }} className="btn-primary w-full">
              <Sparkles size={18} /> Scopri in 1 minuto il percorso giusto per te
            </motion.button>,
            <motion.div key="s" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              <Link to="/" data-testid="link-home-btn" className={item}><Globe size={18} className="text-rosa" /> Il sito di Beauty &amp; Care</Link>
            </motion.div>,
            <motion.div key="f" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              <FreshaButton label="Prenota la tua consulenza" testid="link-fresha-btn" className={item} />
            </motion.div>,
            <motion.div key="p" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              <Link to="/percorsi" data-testid="link-percorsi-btn" className={item}><Map size={18} className="text-rosa" /> I nostri percorsi</Link>
            </motion.div>,
            <motion.div key="w" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              {settings.whatsapp_number ? (
                <a data-testid="link-whatsapp-btn" href={waLink(settings.whatsapp_number, "Ciao, arrivo dalla pagina link.")} target="_blank" rel="noopener noreferrer" className={item}>
                  <MessageCircle size={18} className="text-rosa" /> Scrivici su WhatsApp
                </a>
              ) : (
                <span className={`${item} justify-between`}><span className="flex items-center gap-3"><MessageCircle size={18} className="text-rosa" /> WhatsApp</span><Placeholder label="numero" /></span>
              )}
            </motion.div>,
            <motion.div key="b" variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>
              <Link to="/buoni-regalo" data-testid="link-buoni-btn" className={item}><Gift size={18} className="text-rosa" /> Buoni regalo</Link>
            </motion.div>,
          ]}
        </motion.div>

        <div className="mt-10 w-full rounded-2xl border border-dashed border-amber-500/50 bg-carta/60 p-6 text-center">
          <Placeholder label="video di benvenuto di Susana sul Metodo Rosa (opzionale)" />
        </div>
      </div>
    </div>
  );
};

export default LinkBio;
