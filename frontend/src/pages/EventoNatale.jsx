import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Sparkles, Gift, GlassWater, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import { api } from "@/lib/api";
import { useSite } from "@/lib/siteContext";
import { waLink } from "@/components/WhatsAppFab";

const EventoNatale = () => {
  const { settings } = useSite();
  const [form, setForm] = useState({ nome: "", prefisso: "+41", telefono: "", persone: 1, messaggio: "", consenso: false });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!form.nome.trim() || !form.telefono.trim()) {
      setError("Inserisci nome e numero di telefono.");
      return;
    }
    if (!form.consenso) {
      setError("Per confermare serve il consenso al contatto.");
      return;
    }
    setSending(true);
    setError("");
    try {
      await api.post("/event-rsvps", {
        nome: form.nome.trim(),
        telefono: `${form.prefisso}${form.telefono.replace(/[^\d]/g, "")}`,
        persone: Number(form.persone),
        messaggio: form.messaggio || null,
        consenso: form.consenso,
      });
      setDone(true);
    } catch (e) {
      setError("Qualcosa non ha funzionato. Riprova tra un momento.");
    }
    setSending(false);
  };

  const inputCls = "min-h-[52px] w-full rounded-2xl border border-[#2f4f4a]/20 bg-white/80 px-4 text-[17px] text-[#22312e] outline-none focus:border-[#2f4f4a]";

  return (
    <div data-testid="evento-natale-page" className="grain relative overflow-hidden" style={{ background: "linear-gradient(180deg, #C4E5DD 0%, #DFF0EA 55%, #FAF7F2 100%)" }}>
      <section className="container-site py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#3f5c57]">Beauty &amp; Care · Losone</p>
            <h1 className="mt-5 font-serif text-4xl font-semibold leading-tight text-[#22312e] sm:text-5xl lg:text-6xl">
              Christmas Gift<br />Experience
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-[#3f5c57]">
              Idee regalo · Cofanetti · Proposte imperdibili
            </p>
          </motion.div>

          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/70 p-5 shadow-sm backdrop-blur">
                <CalendarDays size={22} className="mx-auto text-[#3f5c57]" />
                <p className="mt-2 text-sm font-semibold text-[#22312e]">Venerdì 27 novembre</p>
              </div>
              <div className="rounded-3xl bg-white/70 p-5 shadow-sm backdrop-blur">
                <Clock size={22} className="mx-auto text-[#3f5c57]" />
                <p className="mt-2 text-sm font-semibold text-[#22312e]">Dalle ore 17:30</p>
              </div>
              <div className="rounded-3xl bg-white/70 p-5 shadow-sm backdrop-blur">
                <MapPin size={22} className="mx-auto text-[#3f5c57]" />
                <p className="mt-2 text-sm font-semibold text-[#22312e]">Golf Ascona</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-3xl border border-[#2f4f4a]/15 bg-white/70 p-5 text-left">
                <GlassWater size={22} className="shrink-0 text-[#3f5c57]" />
                <p className="text-[15px] font-medium text-[#22312e]"><strong>Aperitivo offerto</strong> per tutte le ospiti</p>
              </div>
              <div className="flex flex-1 items-center gap-3 rounded-3xl border border-[#2f4f4a]/15 bg-white/70 p-5 text-left">
                <Gift size={22} className="shrink-0 text-[#3f5c57]" />
                <p className="text-[15px] font-medium text-[#22312e]"><strong>Omaggio speciale</strong> per tutte le partecipanti</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-[#2f4f4a]/15 bg-white/80 p-8 shadow-lg backdrop-blur">
              {done ? (
                <div data-testid="rsvp-success" className="py-6 text-center">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-salvia-soft text-[#3f5c57]">
                    <CheckCircle2 size={32} />
                  </span>
                  <h2 className="mt-5 font-serif text-3xl font-semibold text-[#22312e]">Grazie {form.nome}!</h2>
                  <p className="mx-auto mt-3 max-w-sm leading-relaxed text-[#3f5c57]">
                    La tua presenza è confermata{form.persone > 1 ? ` per ${form.persone} persone` : ""}. Riceverai in anteprima il nostro menù di Natale, con proposte esclusive a prezzi speciali.
                  </p>
                  <p className="mt-4 font-serif text-xl font-semibold text-[#22312e]">Ti aspettiamo!</p>
                </div>
              ) : (
                <>
                  <h2 className="flex items-center justify-center gap-2 font-serif text-2xl font-semibold text-[#22312e] sm:text-3xl">
                    <Sparkles size={22} className="text-[#3f5c57]" /> Conferma la tua presenza
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#3f5c57]">
                    Riceverai in anteprima il nostro menù di Natale, con proposte esclusive a prezzi speciali. Segna la data in agenda, iscriviti e porta con te un'amica: sarete le benvenute!
                  </p>
                  <div className="mt-7 space-y-4 text-left">
                    <div>
                      <label htmlFor="rsvp-nome" className="mb-1.5 block text-sm font-semibold text-[#22312e]">Nome e cognome</label>
                      <input id="rsvp-nome" data-testid="rsvp-nome-input" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputCls} placeholder="Il tuo nome" />
                    </div>
                    <div>
                      <label htmlFor="rsvp-telefono" className="mb-1.5 block text-sm font-semibold text-[#22312e]">Numero WhatsApp</label>
                      <div className="flex gap-2">
                        <select data-testid="rsvp-prefisso-select" value={form.prefisso} onChange={(e) => setForm({ ...form, prefisso: e.target.value })} className="min-h-[52px] rounded-2xl border border-[#2f4f4a]/20 bg-white/80 px-3 text-[17px] outline-none" aria-label="Prefisso internazionale">
                          <option value="+41">+41</option>
                          <option value="+39">+39</option>
                        </select>
                        <input id="rsvp-telefono" data-testid="rsvp-telefono-input" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} inputMode="tel" className={`${inputCls} flex-1`} placeholder="79 000 00 00" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="rsvp-persone" className="mb-1.5 block text-sm font-semibold text-[#22312e]">Quante sarete?</label>
                      <select id="rsvp-persone" data-testid="rsvp-persone-select" value={form.persone} onChange={(e) => setForm({ ...form, persone: e.target.value })} className={inputCls}>
                        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n === 1 ? "Vengo da sola" : `${n} persone`}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="rsvp-messaggio" className="mb-1.5 block text-sm font-semibold text-[#22312e]">Messaggio <span className="font-normal text-[#3f5c57]">(facoltativo)</span></label>
                      <textarea id="rsvp-messaggio" data-testid="rsvp-messaggio-input" value={form.messaggio} onChange={(e) => setForm({ ...form, messaggio: e.target.value })} rows={2} className={`${inputCls} py-3`} placeholder="Scrivi qui…" />
                    </div>
                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#2f4f4a]/15 bg-white/60 p-4">
                      <input type="checkbox" data-testid="rsvp-consenso-checkbox" checked={form.consenso} onChange={(e) => setForm({ ...form, consenso: e.target.checked })} className="mt-1 h-5 w-5 accent-[#58998B]" />
                      <span className="text-[15px] leading-snug text-[#22312e]">
                        Accetto che Beauty &amp; Care mi contatti in merito all'evento. <a href="/privacy" target="_blank" className="underline">Informativa privacy</a>
                      </span>
                    </label>
                    {error && <p data-testid="rsvp-form-error" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
                    <button data-testid="rsvp-submit-btn" onClick={submit} disabled={sending} className="btn-primary w-full disabled:opacity-50">
                      {sending ? "Un momento…" : "Confermo la mia presenza"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </Reveal>

          {settings.whatsapp_number && (
            <Reveal delay={0.35}>
              <a data-testid="evento-whatsapp-btn" href={waLink(settings.whatsapp_number, "Ciao, vi scrivo per il Christmas Gift Experience del 27 novembre al Golf Ascona.")} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-[#2f4f4a]/30 px-7 text-base font-semibold text-[#22312e] transition-colors hover:bg-white/60">
                Preferisci scriverci su WhatsApp?
              </a>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
};

export default EventoNatale;
