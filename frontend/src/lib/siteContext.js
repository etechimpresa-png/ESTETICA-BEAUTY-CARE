import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getSettings, getPercorsi } from "./api";

const SiteContext = createContext(null);

export const useSite = () => useContext(SiteContext);

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState({});
  const [percorsi, setPercorsi] = useState([]);
  const [aree, setAree] = useState([]);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizDismissed, setQuizDismissed] = useState(
    () => sessionStorage.getItem("bc_quiz_dismissed") === "1"
  );

  useEffect(() => {
    getSettings().then(setSettings).catch(() => {});
    getPercorsi()
      .then((d) => { setPercorsi(d.percorsi); setAree(d.aree); })
      .catch(() => {});
  }, []);

  // Apertura automatica 2-3s dopo l'ingresso, una sola volta per sessione; anche con ?quiz=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("quiz") === "1") {
      setQuizOpen(true);
      return;
    }
    if (quizDismissed) return;
    const t = setTimeout(() => setQuizOpen(true), 2500);
    return () => clearTimeout(t);
  }, [quizDismissed]);

  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const closeQuiz = useCallback(() => {
    setQuizOpen(false);
    setQuizDismissed(true);
    sessionStorage.setItem("bc_quiz_dismissed", "1");
  }, []);

  const percorsoByHandle = useCallback(
    (handle) => percorsi.find((p) => p.handle === handle),
    [percorsi]
  );

  return (
    <SiteContext.Provider
      value={{ settings, setSettings, percorsi, aree, quizOpen, openQuiz, closeQuiz, percorsoByHandle }}
    >
      {children}
    </SiteContext.Provider>
  );
}
