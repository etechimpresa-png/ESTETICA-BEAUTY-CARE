import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import QuizModal from "./QuizModal";
import { useSite } from "@/lib/siteContext";
import { Sparkles } from "lucide-react";

const Layout = () => {
  const { quizOpen, openQuiz } = useSite();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <QuizModal />
      {!quizOpen && (
        <button
          data-testid="quiz-sticky-btn"
          onClick={openQuiz}
          className="fixed bottom-5 left-5 z-40 flex min-h-[48px] items-center gap-2 rounded-full border border-rosa/30 bg-carta/95 px-5 text-sm font-semibold text-rosa shadow-lg backdrop-blur transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-7 sm:left-7"
        >
          <Sparkles size={16} />
          Scopri il tuo percorso in 1 minuto
        </button>
      )}
    </div>
  );
};

export default Layout;
