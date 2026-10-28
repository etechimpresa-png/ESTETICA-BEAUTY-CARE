import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useSite } from "@/lib/siteContext";
import { trackEvent } from "@/lib/api";

export const waLink = (number, message) =>
  `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

const WhatsAppFab = () => {
  const { settings, quizOpen } = useSite();
  const navigate = useNavigate();
  const location = useLocation();

  if (quizOpen || location.pathname === "/link") return null;

  const handleClick = () => {
    trackEvent("whatsapp_click");
    if (settings.whatsapp_number) {
      window.open(waLink(settings.whatsapp_number, "Ciao, vorrei informazioni sui trattamenti di Beauty & Care."), "_blank", "noopener");
    } else {
      navigate("/contatti");
    }
  };

  return (
    <motion.button
      data-testid="whatsapp-floating-btn"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#4a7a52] text-carta shadow-lg transition-transform duration-300 hover:scale-105 sm:bottom-7 sm:right-7"
      aria-label="Scrivici su WhatsApp"
    >
      <MessageCircle size={26} strokeWidth={2} />
    </motion.button>
  );
};

export default WhatsAppFab;
