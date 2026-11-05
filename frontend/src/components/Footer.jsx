import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";
import { ORARI, FACEBOOK_URL } from "@/lib/content";
import { Facebook } from "lucide-react";
import Placeholder from "./Placeholder";
import { useSite } from "@/lib/siteContext";

const Footer = () => {
  const { settings } = useSite();
  const location = useLocation();
  if (location.pathname === "/link") return null;

  return (
    <footer data-testid="site-footer" className="border-t border-border bg-elevato">
      <div className="container-site grid gap-12 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-[15px] leading-relaxed text-muted-foreground">
            Corpo e pelle trattati con natura e tecnologia certificata.
          </p>
          <p className="text-[15px] text-antracite">
            Via Locarno 58, 6616 Losone (TI)
          </p>
          <p className="text-sm text-muted-foreground">
            Susana · Skin Expert Metodo Rosa
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-antracite">Orari</h4>
          <ul className="space-y-1.5 text-[15px] text-muted-foreground">
            {ORARI.map((o) => (
              <li key={o.giorno} className="flex justify-between gap-6">
                <span>{o.giorno}</span>
                <span className="text-right text-antracite">{o.ore}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-antracite">Contatti</h4>
          <div className="space-y-2 text-[15px] text-muted-foreground">
            <p>WhatsApp: {settings.whatsapp_number ? `+${settings.whatsapp_number.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")}` : <Placeholder label="numero WhatsApp dedicato" />}</p>
            <p>Telefono: {settings.telefono || <Placeholder label="telefono" />}</p>
            <p>Email: {settings.email || <Placeholder label="email" />}</p>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <a data-testid="footer-facebook-link" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-muted-foreground hover:text-rosa">
              <Facebook size={16} /> Seguici su Facebook
            </a>
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link data-testid="footer-link-faq" to="/faq" className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline">FAQ</Link>
            <Link data-testid="footer-link-privacy" to="/privacy" className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline">Privacy</Link>
            <Link data-testid="footer-link-condizioni" to="/condizioni" className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline">Condizioni di vendita</Link>
            <Link data-testid="footer-link-cookie" to="/cookie" className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline">Cookie</Link>
            <Link data-testid="footer-link-note-legali" to="/note-legali" className="text-muted-foreground underline-offset-4 hover:text-rosa hover:underline">Note legali</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border/70 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Estetica Beauty &amp; Care – Losone. Tutti i diritti riservati.
      </div>
    </footer>
  );
};

export default Footer;
