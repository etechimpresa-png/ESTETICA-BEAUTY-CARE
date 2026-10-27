// Segnaposto visibile in anteprima per i contenuti che il centro deve ancora fornire.
const Placeholder = ({ label, className = "" }) => (
  <span
    data-testid="placeholder-da-inserire"
    className={`inline-flex items-center gap-1.5 rounded-md border border-dashed border-amber-500/60 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ${className}`}
  >
    [DA INSERIRE: {label}]
  </span>
);

export default Placeholder;
