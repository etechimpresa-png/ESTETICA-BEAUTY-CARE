import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const getSettings = () => api.get("/settings").then((r) => r.data);
export const getPercorsi = () => api.get("/percorsi").then((r) => r.data);
export const getPercorso = (handle) => api.get(`/percorsi/${handle}`).then((r) => r.data);
export const postQuizLead = (lead) => api.post("/quiz-leads", lead).then((r) => r.data);

export const adminLogin = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

export const adminGetLeads = (token, percorso) =>
  api.get("/quiz-leads", { headers: { Authorization: `Bearer ${token}` }, params: percorso ? { percorso } : {} }).then((r) => r.data);

export const adminUpdateSettings = (token, settings) =>
  api.put("/settings", settings, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data);

export const adminExportUrl = () => `${API}/quiz-leads/export`;
