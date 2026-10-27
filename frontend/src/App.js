import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { SiteProvider } from "@/lib/siteContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Corpo from "@/pages/Corpo";
import Viso from "@/pages/Viso";
import Percorsi from "@/pages/Percorsi";
import PercorsoDetail from "@/pages/PercorsoDetail";
import Susana from "@/pages/Susana";
import Servizi from "@/pages/Servizi";
import BuoniRegalo from "@/pages/BuoniRegalo";
import Contatti from "@/pages/Contatti";
import LinkBio from "@/pages/LinkBio";
import Risultato from "@/pages/Risultato";
import Grazie from "@/pages/Grazie";
import Legale from "@/pages/Legale";
import Admin from "@/pages/Admin";
import ComingSoon from "@/pages/ComingSoon";

const ScrollManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95 });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <BrowserRouter>
      <SiteProvider>
        <ScrollManager />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/corpo" element={<Corpo />} />
            <Route path="/viso" element={<Viso />} />
            <Route path="/percorsi" element={<Percorsi />} />
            <Route path="/percorsi/:handle" element={<PercorsoDetail />} />
            <Route path="/susana" element={<Susana />} />
            <Route path="/servizi" element={<Servizi />} />
            <Route path="/buoni-regalo" element={<BuoniRegalo />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/risultato" element={<Risultato />} />
            <Route path="/grazie" element={<Grazie />} />
            <Route path="/prodotti" element={<ComingSoon titolo="Prodotti alla rosa damascena" testo="La linea di prodotti che Susana usa in cabina, presto disponibile anche online. Per ora la trovi in centro." />} />
            <Route path="/formazione" element={<ComingSoon titolo="Formazione" testo="Le masterclass di Susana sono in preparazione. Torna a trovarci." />} />
            <Route path="/open-day" element={<ComingSoon titolo="Open Day" testo="Il prossimo Open Day del centro sarà annunciato qui." />} />
            <Route path="/privacy" element={<Legale tipo="privacy" />} />
            <Route path="/condizioni" element={<Legale tipo="condizioni" />} />
            <Route path="/cookie" element={<Legale tipo="cookie" />} />
            <Route path="/note-legali" element={<Legale tipo="note-legali" />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/link" element={<LinkBio />} />
        </Routes>
      </SiteProvider>
    </BrowserRouter>
  );
}

export default App;
