import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles, Search } from "lucide-react";
import { Logo } from "./Logo";
import { useSite } from "@/lib/siteContext";
import { LISTINO } from "@/lib/content";

const NAV = [
  { to: "/corpo", label: "Corpo" },
  { to: "/viso", label: "Viso" },
  { to: "/percorsi", label: "Percorsi" },
  { to: "/susana", label: "Susana" },
  { to: "/servizi", label: "Servizi" },
  { to: "/buoni-regalo", label: "Buoni regalo" },
  { to: "/contatti", label: "Contatti" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { openQuiz } = useSite();
  const location = useLocation();
  const navigate = useNavigate();
  const onLink = location.pathname === "/link";

  if (onLink) return null;

  const q = query.trim().toLowerCase();
  const results = q.length < 2
    ? []
    : LISTINO.flatMap((f) => f.voci.map((v) => ({ ...v, famiglia: f.famiglia })))
        .filter((v) => v.nome.toLowerCase().includes(q) || v.famiglia.toLowerCase().includes(q))
        .slice(0, 6);

  const goToResult = (v) => {
    setSearchOpen(false);
    setQuery("");
    navigate(`/servizi?q=${encodeURIComponent(v.nome)}`);
  };

  const prezzoLabel = (p) =>
    p == null ? "" : p === "gratuita" ? "Gratuita" : typeof p === "string" ? `da CHF ${p.replace("da ", "")}` : `CHF ${p}`;

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-crema/90 backdrop-blur-md">
      <div className="container-site flex h-[76px] items-center justify-between gap-4">
        <Link to="/" data-testid="nav-logo" aria-label="Beauty & Care Losone – Homepage" onClick={() => setOpen(false)}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navigazione principale">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-link-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              className={({ isActive }) =>
                `text-[15px] font-medium transition-colors duration-200 hover:text-rosa ${
                  isActive ? "text-rosa" : "text-antracite/80"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            data-testid="nav-search-toggle"
            onClick={() => { setSearchOpen((v) => !v); setOpen(false); }}
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full text-antracite transition-colors hover:bg-elevato"
            aria-label="Cerca un trattamento"
          >
            {searchOpen ? <X size={22} /> : <Search size={22} />}
          </button>
          <button
            data-testid="nav-quiz-cta"
            onClick={() => openQuiz()}
            className="hidden min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground shadow-sm transition-[background-color,transform] duration-300 hover:bg-rosa-hover hover:-translate-y-0.5 sm:inline-flex"
          >
            <Sparkles size={17} strokeWidth={2.2} />
            Scopri il tuo percorso
          </button>
          <button
            data-testid="nav-menu-toggle"
            className="inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-full text-antracite lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            data-testid="nav-search-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-crema"
          >
            <div className="container-site py-5">
              <div className="relative mx-auto max-w-xl">
                <Search size={19} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  data-testid="nav-search-input"
                  type="search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cosa stai cercando? Es. pressoterapia, laser, manicure…"
                  className="min-h-[52px] w-full rounded-full border border-input bg-carta pr-5 text-[17px] text-antracite shadow-sm outline-none focus:border-rosa"
                  style={{ paddingLeft: "3rem" }}
                />
              </div>
              {q.length >= 2 && (
                <div className="mx-auto mt-3 max-w-xl overflow-hidden rounded-2xl border border-border bg-carta shadow-sm">
                  {results.map((v, i) => (
                    <button
                      key={`${v.famiglia}-${v.nome}`}
                      data-testid={`nav-search-result-${i}`}
                      onClick={() => goToResult(v)}
                      className="flex w-full items-center justify-between gap-3 border-b border-border/60 px-5 py-3.5 text-left last:border-0 hover:bg-elevato/60"
                    >
                      <span>
                        <span className="block font-medium text-antracite">{v.nome}</span>
                        <span className="block text-xs text-muted-foreground">{v.famiglia}</span>
                      </span>
                      <span className="shrink-0 text-sm font-semibold text-rosa">{prezzoLabel(v.prezzo)}</span>
                    </button>
                  ))}
                  {results.length === 0 && (
                    <p className="px-5 py-4 text-sm text-muted-foreground" data-testid="nav-search-empty">Nessun trattamento trovato per “{query}”.</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-crema lg:hidden"
            aria-label="Menu mobile"
          >
            <div className="container-site flex flex-col gap-1 py-4">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  data-testid={`nav-mobile-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-[48px] items-center rounded-xl px-4 text-lg font-medium ${
                      isActive ? "bg-rosa-soft text-rosa" : "text-antracite"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                data-testid="nav-mobile-quiz-cta"
                onClick={() => { setOpen(false); openQuiz(); }}
                className="btn-primary mt-3 w-full"
              >
                <Sparkles size={18} /> Scopri il tuo percorso
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
