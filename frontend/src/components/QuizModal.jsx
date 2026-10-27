import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, X, Sparkles } from "lucide-react";
import { useSite } from "@/lib/siteContext";
import { postQuizLead } from "@/lib/api";
import {
  D1_OPTIONS, D2_OPTIONS, D3_OPTIONS, D4_OPTIONS,
  computeResult, buildWhatsAppMessage,
} from "@/lib/quizLogic";

const slide = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const QuizModal = () => {
  const { quizOpen, closeQuiz, percorsoByHandle } = useSite();
  const navigate = useNavigate();

  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState({ d1: null, d2: null, d3: null, d4: null });
  const [altroText, setAltroText] = useState("");
  const [form, setForm] = useState({ nome: "", prefisso: "+41", telefono: "", consenso: false, marketing: false });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (quizOpen) {
      setStep("intro");
      setAnswers({ d1: null, d2: null, d3: null, d4: null });
      setAltroText("");
      setForm({ nome: "", prefisso: "+41", telefono: "", consenso: false, marketing: false });
      setError("");
    }
  }, [quizOpen]);

  const needsAltroText = answers.d1 === "altro" || answers.d2 === "altro";

  const steps = useMemo(() => {
    const s = ["d1"];
    if (answers.d1 && answers.d1 !== "altro") s.push("d2");
    if (needsAltroText) s.push("altro_text");
    s.push("d3", "d4", "contatto");
    return s;
  }, [answers.d1, needsAltroText]);

  const progress = step === "intro" ? 0 : (steps.indexOf(step) + 1) / steps.length;

  const goBack = () => {
    if (step === "intro") return closeQuiz();
    const prev = {
      d1: "intro",
      d2: "d1",
      altro_text: answers.d1 === "altro" ? "d1" : "d2",
      d3: needsAltroText ? "altro_text" : "d2",
      d4: "d3",
      contatto: "d4",
    }[step];
    setStep(prev || "intro");
  };

  const pick = (key, value) => {
    const next = { ...answers, [key]: value };
    if (key === "d1") next.d2 = null;
    setAnswers(next);
    if (key === "d1") setStep(value === "altro" ? "altro_text" : "d2");
    else if (key === "d2") setStep(value === "altro" ? "altro_text" : "d3");
    else if (key === "d3") setStep("d4");
    else if (key === "d4") setStep("contatto");
  };

  const submit = async () => {
    if (!form.nome.trim() || !form.telefono.trim()) {
      setError("Inserisci nome e numero di telefono.");
      return;
    }
    if (!form.consenso) {
      setError("Per continuare serve il consenso al contatto su WhatsApp.");
      return;
    }
    setSending(true);
    setError("");
    const result = computeResult(answers);
    const percorsoObj = result.percorso !== "consulenza" ? percorsoByHandle(result.percorso) : null;
    const utm = {};
    new URLSearchParams(window.location.search).forEach((v, k) => {
      if (k.startsWith("utm_")) utm[k] = v;
    });
    const lead = {
      nome: form.nome.trim(),
      telefono: `${form.prefisso}${form.telefono.replace(/[^\d]/g, "")}`,
      ...answers,
      altro_text: altroText || null,
      percorso: result.percorso,
      livello: result.livello,
      secondo_percorso: result.secondo,
      consenso_contatto: form.consenso,
      consenso_marketing: form.marketing,
      utm,
      fonte: "quiz",
    };
    try {
      await postQuizLead(lead);
    } catch (e) {
      // Il dato resta tracciato lato client e riprovabile; non blocchiamo il risultato.
    }
    const waMsg = buildWhatsAppMessage({
      nome: lead.nome,
      percorsoNome: percorsoObj?.nome || null,
      livello: result.livello,
      altroText,
      ...answers,
    });
    sessionStorage.setItem(
      "bc_quiz_result",
      JSON.stringify({ ...lead, messaggio: result.messaggio, waMsg, percorsoNome: percorsoObj?.nome || null })
    );
    setSending(false);
    closeQuiz();
    navigate("/risultato");
  };

  const OptionButton = ({ label, onClick, testid }) => (
    <motion.button
      data-testid={testid}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className="flex min-h-[52px] w-full items-center rounded-2xl border border-border bg-carta px-5 py-3.5 text-left text-[17px] font-medium text-antracite shadow-sm transition-[border-color,background-color,box-shadow] duration-200 hover:border-rosa/50 hover:bg-rosa-soft/40 hover:shadow"
    >
      {label}
    </motion.button>
  );

  return (
    <AnimatePresence>
      {quizOpen && (
        <motion.div
          data-testid="quiz-modal"
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-antracite/50 backdrop-blur-sm" onClick={closeQuiz} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-crema shadow-2xl sm:rounded-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="Quiz: scopri il tuo percorso"
          >
            <div className="flex items-center justify-between px-6 pt-5">
              {step !== "intro" ? (
                <button data-testid="quiz-back-btn" onClick={goBack} className="flex min-h-[44px] items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-antracite">
                  <ArrowLeft size={17} /> Indietro
                </button>
              ) : <span />}
              <button data-testid="quiz-close-btn" onClick={closeQuiz} aria-label="Chiudi il quiz" className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-muted-foreground hover:bg-elevato hover:text-antracite">
                <X size={22} />
              </button>
            </div>
            {step !== "intro" && (
              <div className="mx-6 mt-1 h-1.5 overflow-hidden rounded-full bg-elevato">
                <motion.div
                  data-testid="quiz-progress-bar"
                  className="h-full rounded-full bg-rosa"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-6 pb-8 pt-4">
              <AnimatePresence mode="wait">
                {step === "intro" && (
                  <motion.div key="intro" {...slide} className="pt-4 text-center">
                    <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-rosa-soft text-rosa">
                      <Sparkles size={26} />
                    </span>
                    <h2 className="font-serif text-3xl font-semibold leading-tight text-antracite">
                      Di cosa ha bisogno il tuo corpo (o la tua pelle)?
                    </h2>
                    <p className="mt-3 text-muted-foreground">Scoprilo in 1 minuto.</p>
                    <p className="mx-auto mt-5 max-w-sm rounded-2xl bg-salvia-soft px-5 py-4 text-[15px] font-medium text-[#40513c]">
                      Alla fine ricevi un consiglio personale di Susana e il 10% sul primo trattamento.
                    </p>
                    <button data-testid="quiz-start-btn" onClick={() => setStep("d1")} className="btn-primary mt-7 w-full">
                      Inizia il quiz
                    </button>
                  </motion.div>
                )}

                {step === "d1" && (
                  <motion.div key="d1" {...slide}>
                    <h2 className="mb-5 font-serif text-2xl font-semibold text-antracite">Cosa vuoi migliorare?</h2>
                    <div className="space-y-2.5">
                      {D1_OPTIONS.map((o) => (
                        <OptionButton key={o.id} testid={`quiz-d1-${o.id}`} label={o.label} onClick={() => pick("d1", o.id)} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "d2" && answers.d1 && (
                  <motion.div key="d2" {...slide}>
                    <h2 className="mb-5 font-serif text-2xl font-semibold text-antracite">Qual è il tuo obiettivo principale?</h2>
                    <div className="space-y-2.5">
                      {(D2_OPTIONS[answers.d1] || []).map((o) => (
                        <OptionButton key={o.id} testid={`quiz-d2-${o.id}`} label={o.label} onClick={() => pick("d2", o.id)} />
                      ))}
                      <OptionButton testid="quiz-d2-altro" label="Altro" onClick={() => pick("d2", "altro")} />
                    </div>
                  </motion.div>
                )}

                {step === "altro_text" && (
                  <motion.div key="altro_text" {...slide}>
                    <h2 className="mb-5 font-serif text-2xl font-semibold text-antracite">Raccontaci in poche parole cosa cerchi</h2>
                    <textarea
                      data-testid="quiz-altro-input"
                      value={altroText}
                      onChange={(e) => setAltroText(e.target.value)}
                      rows={4}
                      placeholder="Scrivi qui…"
                      className="w-full rounded-2xl border border-input bg-carta p-4 text-[17px] text-antracite outline-none focus:border-rosa"
                    />
                    <button
                      data-testid="quiz-altro-continua"
                      onClick={() => setStep("d3")}
                      disabled={!altroText.trim()}
                      className="btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continua
                    </button>
                  </motion.div>
                )}

                {step === "d3" && (
                  <motion.div key="d3" {...slide}>
                    <h2 className="mb-5 font-serif text-2xl font-semibold text-antracite">In che fascia d'età sei?</h2>
                    <div className="space-y-2.5">
                      {D3_OPTIONS.map((o) => (
                        <OptionButton key={o.id} testid={`quiz-d3-${o.id}`} label={o.label} onClick={() => pick("d3", o.id)} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "d4" && (
                  <motion.div key="d4" {...slide}>
                    <h2 className="mb-5 font-serif text-2xl font-semibold text-antracite">Hai già fatto trattamenti simili?</h2>
                    <div className="space-y-2.5">
                      {D4_OPTIONS.map((o) => (
                        <OptionButton key={o.id} testid={`quiz-d4-${o.id}`} label={o.label} onClick={() => pick("d4", o.id)} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "contatto" && (
                  <motion.div key="contatto" {...slide}>
                    <h2 className="mb-2 font-serif text-2xl font-semibold text-antracite">Dove ti mando il tuo risultato?</h2>
                    <p className="mb-5 text-[15px] text-muted-foreground">Susana ti scrive personalmente su WhatsApp.</p>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="quiz-nome" className="mb-1.5 block text-sm font-semibold text-antracite">Nome</label>
                        <input
                          id="quiz-nome"
                          data-testid="quiz-nome-input"
                          value={form.nome}
                          onChange={(e) => setForm({ ...form, nome: e.target.value })}
                          className="min-h-[52px] w-full rounded-2xl border border-input bg-carta px-4 text-[17px] outline-none focus:border-rosa"
                          placeholder="Il tuo nome"
                        />
                      </div>
                      <div>
                        <label htmlFor="quiz-telefono" className="mb-1.5 block text-sm font-semibold text-antracite">Numero WhatsApp</label>
                        <div className="flex gap-2">
                          <select
                            data-testid="quiz-prefisso-select"
                            value={form.prefisso}
                            onChange={(e) => setForm({ ...form, prefisso: e.target.value })}
                            className="min-h-[52px] rounded-2xl border border-input bg-carta px-3 text-[17px] outline-none focus:border-rosa"
                            aria-label="Prefisso internazionale"
                          >
                            <option value="+41">+41</option>
                            <option value="+39">+39</option>
                            <option value="+49">+49</option>
                            <option value="+33">+33</option>
                          </select>
                          <input
                            id="quiz-telefono"
                            data-testid="quiz-telefono-input"
                            value={form.telefono}
                            onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                            inputMode="tel"
                            className="min-h-[52px] flex-1 rounded-2xl border border-input bg-carta px-4 text-[17px] outline-none focus:border-rosa"
                            placeholder="79 000 00 00"
                          />
                        </div>
                      </div>
                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-carta p-4">
                        <input
                          type="checkbox"
                          data-testid="quiz-consenso-checkbox"
                          checked={form.consenso}
                          onChange={(e) => setForm({ ...form, consenso: e.target.checked })}
                          className="mt-1 h-5 w-5 accent-[#B86A75]"
                        />
                        <span className="text-[15px] leading-snug text-antracite">
                          Accetto che Beauty &amp; Care mi contatti su WhatsApp in merito alla mia richiesta.{" "}
                          <a href="/privacy" target="_blank" className="text-rosa underline">Informativa privacy</a>
                        </span>
                      </label>
                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-border bg-carta p-4">
                        <input
                          type="checkbox"
                          data-testid="quiz-marketing-checkbox"
                          checked={form.marketing}
                          onChange={(e) => setForm({ ...form, marketing: e.target.checked })}
                          className="mt-1 h-5 w-5 accent-[#B86A75]"
                        />
                        <span className="text-[15px] leading-snug text-muted-foreground">
                          Voglio ricevere consigli e novità dal centro su WhatsApp. (facoltativo)
                        </span>
                      </label>
                      {error && (
                        <p data-testid="quiz-form-error" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>
                      )}
                      <button
                        data-testid="quiz-submit-btn"
                        onClick={submit}
                        disabled={sending}
                        className="btn-primary w-full disabled:opacity-50"
                      >
                        {sending ? "Un momento…" : "Vedi il mio risultato"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
