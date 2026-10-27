import Placeholder from "./Placeholder";
import { useSite } from "@/lib/siteContext";

// Pulsante Fresha: usa il link quando il centro lo fornisce, altrimenti mostra il segnaposto.
const FreshaButton = ({ label = "Prenota la consulenza gratuita", kind = "consulenza", className = "btn-secondary", testid = "fresha-btn" }) => {
  const { settings } = useSite();
  const url = kind === "consulenza"
    ? settings.fresha_consulenza_url || settings.fresha_url
    : kind === "buoni"
      ? settings.fresha_buoni_url || settings.fresha_url
      : settings.fresha_url;

  if (!url) {
    return (
      <span className="inline-flex flex-col items-start gap-2">
        <span data-testid={testid} className={`${className} pointer-events-none opacity-60`}>{label}</span>
        <Placeholder label={`link Fresha ${kind}`} />
      </span>
    );
  }
  return (
    <a data-testid={testid} href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
};

export default FreshaButton;
