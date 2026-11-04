import { useEffect, useState } from "react";
import { Download, LogOut } from "lucide-react";
import { adminLogin, adminGetLeads, adminUpdateSettings, adminGetStats, api } from "@/lib/api";
import { useSite } from "@/lib/siteContext";

const FLAGS = [
  ["shop_prodotti_attivo", "Shop prodotti"],
  ["formazione_attiva", "Formazione"],
  ["open_day_attivo", "Evento Natale / Open Day"],
  ["pagamento_rate_attivo", "Pagamento a rate"],
  ["banner_buoni_regalo_attivo", "Banner buoni regalo"],
  ["sconto_quiz_attivo", "Sconto quiz (QUIZ10)"],
];

const Admin = () => {
  const { settings, setSettings, percorsi } = useSite();
  const [token, setToken] = useState(() => sessionStorage.getItem("bc_admin_token"));
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [leads, setLeads] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [stats, setStats] = useState(null);
  const [rsvps, setRsvps] = useState(null);

  const load = (t, f) => adminGetLeads(t, f || undefined).then((d) => setLeads(d.leads)).catch(() => setError("Sessione scaduta, accedi di nuovo."));

  useEffect(() => { if (token) { load(token, filtro); adminGetStats(token).then(setStats).catch(() => {}); } }, [token, filtro]);
  useEffect(() => {
    if (token) api.get("/event-rsvps", { headers: { Authorization: `Bearer ${token}` } }).then((r) => setRsvps(r.data)).catch(() => {});
  }, [token]);

  const doLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const d = await adminLogin(form.email, form.password);
      sessionStorage.setItem("bc_admin_token", d.token);
      setToken(d.token);
    } catch (err) {
      const det = err.response?.data?.detail;
      setError(typeof det === "string" ? det : "Accesso non riuscito.");
    }
  };

  const toggle = async (key) => {
    const updated = await adminUpdateSettings(token, { [key]: !settings[key] });
    setSettings(updated);
  };

  const exportCsv = async () => {
    const r = await api.get("/quiz-leads/export", { headers: { Authorization: `Bearer ${token}` }, responseType: "blob" });
    const url = URL.createObjectURL(r.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contatti-quiz.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!token) {
    return (
      <div data-testid="admin-login" className="container-site flex min-h-[70vh] items-center justify-center py-20">
        <form onSubmit={doLogin} className="w-full max-w-sm rounded-3xl border border-border bg-carta p-8 shadow-sm">
          <h1 className="font-serif text-2xl font-semibold text-antracite">Area riservata</h1>
          <p className="mt-2 text-sm text-muted-foreground">Contatti del quiz e impostazioni del sito.</p>
          <label className="mt-6 block text-sm font-semibold text-antracite">Email</label>
          <input data-testid="admin-email-input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1.5 min-h-[48px] w-full rounded-xl border border-input bg-crema px-4 outline-none focus:border-rosa" />
          <label className="mt-4 block text-sm font-semibold text-antracite">Password</label>
          <input data-testid="admin-password-input" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1.5 min-h-[48px] w-full rounded-xl border border-input bg-crema px-4 outline-none focus:border-rosa" />
          {error && <p data-testid="admin-login-error" className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">{error}</p>}
          <button data-testid="admin-login-btn" className="btn-primary mt-6 w-full">Accedi</button>
        </form>
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="container-site py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold text-antracite">Contatti del quiz</h1>
        <div className="flex gap-3">
          <button data-testid="admin-export-btn" onClick={exportCsv} className="btn-secondary !min-h-[44px] !px-5 text-sm">
            <Download size={16} /> Esporta CSV
          </button>
          <button data-testid="admin-logout-btn" onClick={() => { sessionStorage.removeItem("bc_admin_token"); setToken(null); }} className="btn-secondary !min-h-[44px] !px-5 text-sm">
            <LogOut size={16} /> Esci
          </button>
        </div>
      </div>

      {stats && (
        <div className="mt-8" data-testid="admin-stats">
          <h2 className="font-serif text-xl font-semibold text-antracite">Statistiche del sito</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              ["Visite oggi", stats.visite_oggi],
              ["Visite ultimi 7 giorni", stats.visite_7gg],
              ["Visite ultimi 30 giorni", stats.visite_30gg],
              ["Contatti dal quiz (totali)", stats.lead_totali],
              ["Quiz iniziati (30 gg)", stats.quiz_iniziati_30gg],
              ["Quiz completati (30 gg)", stats.quiz_completati_30gg],
              ["Clic su WhatsApp (30 gg)", stats.clic_whatsapp_30gg],
              ["Clic su Fresha (30 gg)", stats.clic_fresha_30gg],
            ].map(([label, val]) => (
              <div key={label} className="rounded-2xl border border-border bg-carta p-5" data-testid={`stat-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <p className="text-3xl font-semibold text-rosa">{val}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
          {stats.pagine_top?.length > 0 && (
            <div className="mt-4 rounded-2xl border border-border bg-carta p-5">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Pagine più visitate (30 giorni)</p>
              <ul className="space-y-1.5 text-[15px]">
                {stats.pagine_top.map((p) => (
                  <li key={p.path} className="flex justify-between gap-4">
                    <span className="text-antracite">{p.path === "/" ? "Home" : p.path}</span>
                    <span className="font-semibold text-rosa">{p.visite}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {rsvps && (
        <div className="mt-8" data-testid="admin-rsvps">
          <h2 className="font-serif text-xl font-semibold text-antracite">Iscrizioni evento — Christmas Gift Experience (27 nov)</h2>
          <p className="mt-1 text-sm text-muted-foreground">{rsvps.totale_iscrizioni} iscrizioni · {rsvps.totale_persone} persone in totale</p>
          <div className="mt-4 overflow-x-auto rounded-3xl border border-border bg-carta">
            <table className="w-full min-w-[640px] text-left text-[15px]">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-5 py-3">Data</th>
                  <th className="px-5 py-3">Nome</th>
                  <th className="px-5 py-3">Telefono</th>
                  <th className="px-5 py-3">Persone</th>
                  <th className="px-5 py-3">Messaggio</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.rsvps.map((r, i) => (
                  <tr key={i} className="border-b border-border/60 last:border-0" data-testid={`admin-rsvp-row-${i}`}>
                    <td className="px-5 py-3 text-muted-foreground">{r.created_at ? new Date(r.created_at).toLocaleString("it-CH") : ""}</td>
                    <td className="px-5 py-3 font-medium text-antracite">{r.nome}</td>
                    <td className="px-5 py-3">{r.telefono}</td>
                    <td className="px-5 py-3">{r.persone}</td>
                    <td className="px-5 py-3 text-muted-foreground">{r.messaggio || "–"}</td>
                  </tr>
                ))}
                {rsvps.rsvps.length === 0 && (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">Nessuna iscrizione per ora.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-3xl border border-border bg-carta p-6">
        <h2 className="font-serif text-xl font-semibold text-antracite">Interruttori del sito</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FLAGS.map(([key, label]) => (
            <label key={key} className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-border bg-crema px-4 py-3">
              <span className="text-[15px] font-medium text-antracite">{label}</span>
              <input type="checkbox" data-testid={`admin-flag-${key}`} checked={!!settings[key]} onChange={() => toggle(key)} className="h-5 w-5 accent-[#58998B]" />
            </label>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <label className="text-sm font-semibold text-antracite">Filtra per percorso:</label>
        <select data-testid="admin-filter-percorso" value={filtro} onChange={(e) => setFiltro(e.target.value)}
          className="min-h-[44px] rounded-xl border border-input bg-carta px-3 outline-none focus:border-rosa">
          <option value="">Tutti</option>
          <option value="consulenza">Consulenza personalizzata</option>
          {percorsi.map((p) => <option key={p.handle} value={p.handle}>{p.nome}</option>)}
        </select>
      </div>

      <div className="mt-5 overflow-x-auto rounded-3xl border border-border bg-carta">
        <table className="w-full min-w-[760px] text-left text-[15px]">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3">Data</th>
              <th className="px-5 py-3">Nome</th>
              <th className="px-5 py-3">Telefono</th>
              <th className="px-5 py-3">Percorso</th>
              <th className="px-5 py-3">Livello</th>
              <th className="px-5 py-3">Marketing</th>
            </tr>
          </thead>
          <tbody>
            {(leads || []).map((l, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0" data-testid={`admin-lead-row-${i}`}>
                <td className="px-5 py-3 text-muted-foreground">{l.created_at ? new Date(l.created_at).toLocaleString("it-CH") : ""}</td>
                <td className="px-5 py-3 font-medium text-antracite">{l.nome}</td>
                <td className="px-5 py-3">{l.telefono}</td>
                <td className="px-5 py-3">{l.percorso}</td>
                <td className="px-5 py-3">{l.livello ?? "–"}</td>
                <td className="px-5 py-3">{l.consenso_marketing ? "Sì" : "No"}</td>
              </tr>
            ))}
            {leads && leads.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">Nessun contatto per ora.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
