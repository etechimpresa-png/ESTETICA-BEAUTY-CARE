import Reveal from "@/components/Reveal";
import FreshaButton from "@/components/FreshaButton";
import Placeholder from "@/components/Placeholder";
import { CheckCircle2 } from "lucide-react";
import { useSite } from "@/lib/siteContext";
import { waLink } from "@/components/WhatsAppFab";

const Grazie = () => {
  const { settings } = useSite();
  let nome = null;
  try {
    const raw = sessionStorage.getItem("bc_quiz_result");
    if (raw) nome = JSON.parse(raw).nome;
  } catch {}

  return (
    <div data-testid="grazie-page" className="container-site flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <Reveal>
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-salvia-soft text-[#4c5c48]">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="mt-6 max-w-xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
          Grazie{nome ? ` ${nome}` : ""}! Il tuo percorso è confermato.
        </h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground">
          Ora prenota la tua consulenza inclusa: è il primo passo del tuo percorso.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <FreshaButton label="Prenota la consulenza inclusa" testid="grazie-fresha-btn" className="btn-primary" />
          {settings.whatsapp_number ? (
            <a data-testid="grazie-whatsapp-btn" href={waLink(settings.whatsapp_number, "Ciao, ho appena acquistato un percorso.")} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Scrivici su WhatsApp
            </a>
          ) : (
            <Placeholder label="numero WhatsApp dedicato" />
          )}
        </div>
      </Reveal>
    </div>
  );
};

export default Grazie;
