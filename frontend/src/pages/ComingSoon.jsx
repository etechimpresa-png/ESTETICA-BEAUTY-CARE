import { Clock } from "lucide-react";

const ComingSoon = ({ titolo, testo }) => (
  <div data-testid="coming-soon-page" className="container-site flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rosa-soft text-rosa"><Clock size={26} /></span>
    <h1 className="mt-6 font-serif text-4xl font-semibold text-antracite">{titolo}</h1>
    <p className="mt-4 max-w-md text-muted-foreground">{testo}</p>
  </div>
);

export default ComingSoon;
