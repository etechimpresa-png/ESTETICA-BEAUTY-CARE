export const LogoMark = ({ className = "h-10 w-10" }) => (
  <img src="/assets/brand/logo-circle.png" alt="" className={`${className} rounded-full object-cover`} aria-hidden="true" />
);

export const Logo = ({ compact = false }) => (
  <span className="flex items-center">
    <img
      src="/assets/brand/logo.png"
      alt="Beauty & Care – Estetica avanzata e terapie · Susana Cabezas"
      className={compact ? "h-11 w-auto" : "h-14 w-auto"}
    />
  </span>
);
