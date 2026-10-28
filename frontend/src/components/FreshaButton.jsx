import { useSite } from "@/lib/siteContext";
import { FRESHA_URL } from "@/lib/content";
import { trackEvent } from "@/lib/api";

// Pulsante Fresha: link al listino prenotazioni del centro (sempre attivo).
const FreshaButton = ({ label = "Prenota la consulenza gratuita", kind = "consulenza", className = "btn-secondary", testid = "fresha-btn" }) => {
  const { settings } = useSite();
  const url = (kind === "consulenza"
    ? settings.fresha_consulenza_url || settings.fresha_url
    : kind === "buoni"
      ? settings.fresha_buoni_url || settings.fresha_url
      : settings.fresha_url) || FRESHA_URL;

  return (
    <a data-testid={testid} href={url} target="_blank" rel="noopener noreferrer" className={className} onClick={() => trackEvent("fresha_click")}>
      {label}
    </a>
  );
};

export default FreshaButton;
