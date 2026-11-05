import Reveal from "@/components/Reveal";
import { ORARI, IMAGES, PARCOGGIO, FACEBOOK_URL } from "@/lib/content";
import { useSite } from "@/lib/siteContext";
import { waLink } from "@/components/WhatsAppFab";
import { MapPin, Phone, Mail, MessageCircle, Facebook } from "lucide-react";

const Contatti = () => {
  const { settings } = useSite();

  return (
    <div data-testid="contatti-page" className="container-site py-16 lg:py-24">
      <Reveal>
        <p className="eyebrow mb-3">Contatti</p>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight text-antracite sm:text-5xl">
          Vieni a trovarci a Losone
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <Reveal className="space-y-8">
          <div>
            <h2 className="font-serif text-xl font-semibold text-antracite">Il centro</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <figure className="overflow-hidden rounded-2xl border border-border" data-testid="centro-foto-accoglienza">
                <img src={IMAGES.ricezione} alt="L'accoglienza del centro Beauty & Care a Losone" className="aspect-[3/4] h-full w-full object-cover" loading="lazy" />
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-border" data-testid="centro-foto-cabina">
                <img src={IMAGES.cabina} alt="La cabina trattamenti del centro" className="aspect-[3/4] h-full w-full object-cover" loading="lazy" />
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-border" data-testid="centro-foto-cabina-viso">
                <img src={IMAGES.viso} alt="La cabina viso con parete floreale" className="aspect-[3/4] h-full w-full object-cover" loading="lazy" />
              </figure>
              <figure className="overflow-hidden rounded-2xl border border-border" data-testid="centro-foto-pedicure">
                <img src={IMAGES.pedicure} alt="La zona manicure e pedicure" className="aspect-[3/4] h-full w-full object-cover" loading="lazy" />
              </figure>
            </div>
          </div>
          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-antracite"><MapPin size={19} className="text-rosa" /> Indirizzo</h2>
            <p className="mt-2 text-lg text-antracite">Estetica Beauty &amp; Care<br />Via Locarno 58, 6616 Losone (TI)</p>
            <p className="mt-2 text-[15px] text-muted-foreground">Parcheggio: {PARCOGGIO}</p>
          </div>
          <div>
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-antracite"><MessageCircle size={19} className="text-rosa" /> WhatsApp</h2>
            <a
            data-testid="contatti-whatsapp-btn"
            href={waLink(settings.whatsapp_number, "Ciao, vorrei informazioni.")}
            target="_blank" rel="noopener noreferrer" className="btn-primary"
          >
            Scrivici su WhatsApp
          </a>
          </div>
          <div className="space-y-3">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-antracite"><Phone size={19} className="text-rosa" /> Telefono ed email</h2>
            <p className="text-lg text-antracite">{settings.telefono}</p>
            <p className="flex items-center gap-2 text-lg text-antracite"><Mail size={17} className="text-rosa" /> {settings.email}</p>
            <a data-testid="contatti-facebook-link" href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-lg font-medium text-antracite hover:text-rosa">
              <Facebook size={17} className="text-rosa" /> Estetica Beauty &amp; Care su Facebook
            </a>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-antracite">Orari</h2>
            <ul className="mt-3 space-y-1.5 text-[15px] text-muted-foreground">
              {ORARI.map((o) => (
                <li key={o.giorno} className="flex gap-4"><span className="w-24">{o.giorno}</span><span className="text-antracite">{o.ore}</span></li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-border shadow-sm">
            <iframe
              title="Mappa: Estetica Beauty & Care, Via Locarno 58, Losone"
              src="https://www.google.com/maps?q=Via%20Locarno%2058%2C%206616%20Losone%2C%20Svizzera&output=embed"
              className="h-full min-h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Contatti;
