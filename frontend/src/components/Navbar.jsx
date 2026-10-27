import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { useSite } from "@/lib/siteContext";

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
  const { openQuiz } = useSite();
  const location = useLocation();
  const onLink = location.pathname === "/link";

  if (onLink) return null;

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
