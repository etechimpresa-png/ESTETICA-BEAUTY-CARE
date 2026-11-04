export const LogoMark = ({ className = "h-10 w-10" }) => (
  <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
    <circle cx="24" cy="24" r="22.5" fill="none" stroke="#58998B" strokeWidth="2" />
    <path d="M24 35c-7-4.5-10.5-10-10.5-15.5a10.5 10.5 0 0 1 21 0C34.5 25 31 30.5 24 35z" fill="#58998B" />
    <path d="M24 35c0-7 0-12 0-17" stroke="#FAF7F2" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <path d="M24 24c-2.5-1-4.5-3-5.5-5.5M24 24c2.5-1 4.5-3 5.5-5.5" stroke="#FAF7F2" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  </svg>
);

export const Logo = ({ compact = false }) => (
  <span className="flex items-center gap-3">
    <LogoMark className={compact ? "h-8 w-8" : "h-10 w-10"} />
    <span className="leading-none">
      <span className={`font-serif font-semibold text-antracite ${compact ? "text-lg" : "text-xl"}`}>
        Beauty <span className="text-rosa">&amp;</span> Care
      </span>
      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
        Losone
      </span>
    </span>
  </span>
);
