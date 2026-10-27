import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AREA_BADGE = {
  corpo: "bg-salvia-soft text-[#4c5c48]",
  viso: "bg-rosa-soft text-rosa",
  peli: "bg-elevato text-antracite",
  relax: "bg-salvia-soft text-[#4c5c48]",
  sguardo: "bg-rosa-soft text-rosa",
  maniepiedi: "bg-elevato text-antracite",
};

const PercorsoCard = ({ percorso, areaNome, small = false }) => {
  const prezzoMin = Math.min(...percorso.livelli.map((l) => l.prezzo));
  return (
    <Link
      to={`/percorsi/${percorso.handle}`}
      data-testid={`percorso-card-${percorso.handle}`}
      className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-carta p-6 shadow-sm transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-rosa/40 hover:shadow-lg"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${AREA_BADGE[percorso.area] || "bg-elevato text-antracite"}`}>
            {areaNome || percorso.area}
          </span>
          <span className="text-xs text-muted-foreground">Percorso n. {percorso.numero}</span>
        </div>
        <h3 className={`font-serif font-semibold text-antracite ${small ? "text-xl" : "text-2xl"}`}>
          {percorso.nome}
        </h3>
        {!small && (
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{percorso.promessa}</p>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-semibold text-antracite">
          da CHF {prezzoMin}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-rosa transition-transform duration-300 group-hover:translate-x-1">
          Scopri il percorso <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
};

export default PercorsoCard;
