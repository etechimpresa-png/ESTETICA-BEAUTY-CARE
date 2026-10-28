from dotenv import load_dotenv

load_dotenv()

import os
import io
import csv
import logging
from pathlib import Path
from datetime import datetime, timezone, timedelta
from typing import Optional, List

import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.responses import StreamingResponse
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field

from percorsi_data import PERCORSI, AREE_ORDINE

ROOT_DIR = Path(__file__).parent

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

JWT_ALGORITHM = "HS256"

app = FastAPI()
api_router = APIRouter(prefix="/api")

DEFAULT_SETTINGS = {
    "shop_prodotti_attivo": False,
    "formazione_attiva": False,
    "open_day_attivo": False,
    "pagamento_rate_attivo": False,
    "banner_buoni_regalo_attivo": True,
    "sconto_quiz_attivo": True,
    "rme_valido": False,
    "whatsapp_number": "",
    "fresha_url": "https://www.fresha.com/it/a/estetica-beauty-and-care-losone-via-locarno-58-jwl8ceyb/booking",
    "fresha_consulenza_url": "",
    "fresha_buoni_url": "",
    "telefono": "091 730 10 77",
    "email": "",
}

# ---------- Auth ----------


class LoginInput(BaseModel):
    email: str
    password: str


def create_token(email: str) -> str:
    payload = {
        "sub": email,
        "role": "admin",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
    }
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)


async def require_admin(request: Request):
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Non autenticato")
    try:
        payload = jwt.decode(auth[7:], os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token non valido")
    return payload


@api_router.post("/auth/login")
async def login(input: LoginInput, request: Request):
    email = input.email.strip().lower()
    identifier = f"{request.client.host}:{email}"
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    if attempt and attempt.get("locked_until"):
        locked_until = datetime.fromisoformat(attempt["locked_until"])
        if locked_until > datetime.now(timezone.utc):
            raise HTTPException(status_code=429, detail="Troppi tentativi. Riprova tra 15 minuti.")
    if email != os.environ["ADMIN_EMAIL"].lower() or input.password != os.environ["ADMIN_PASSWORD"]:
        attempts = (attempt or {}).get("attempts", 0) + 1
        update = {"identifier": identifier, "attempts": attempts}
        if attempts >= 5:
            update["locked_until"] = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
        await db.login_attempts.update_one({"identifier": identifier}, {"$set": update}, upsert=True)
        raise HTTPException(status_code=401, detail="Email o password non corrette")
    await db.login_attempts.delete_one({"identifier": identifier})
    return {"token": create_token(email), "email": email}


# ---------- Impostazioni (interruttori) ----------


@api_router.get("/settings")
async def get_settings():
    doc = await db.settings.find_one({"_id": "site"}) or {}
    settings = {**DEFAULT_SETTINGS, **{k: v for k, v in doc.items() if k != "_id"}}
    return settings


@api_router.put("/settings")
async def update_settings(request: Request, admin=Depends(require_admin)):
    body = await request.json()
    allowed = {k: v for k, v in body.items() if k in DEFAULT_SETTINGS}
    if not allowed:
        raise HTTPException(status_code=400, detail="Nessuna impostazione valida")
    await db.settings.update_one({"_id": "site"}, {"$set": allowed}, upsert=True)
    return await get_settings()


# ---------- Percorsi (catalogo locale, in attesa di Shopify) ----------


@api_router.get("/percorsi")
async def list_percorsi():
    return {"percorsi": PERCORSI, "aree": [{"id": a, "nome": n} for a, n in AREE_ORDINE]}


@api_router.get("/percorsi/{handle}")
async def get_percorso(handle: str):
    for p in PERCORSI:
        if p["handle"] == handle:
            return p
    raise HTTPException(status_code=404, detail="Percorso non trovato")


# ---------- Lead del quiz ----------


class QuizLead(BaseModel):
    nome: str
    telefono: str
    d1: str
    d2: Optional[str] = None
    d3: str
    d4: str
    altro_text: Optional[str] = None
    percorso: str
    livello: Optional[int] = None
    secondo_percorso: Optional[str] = None
    consenso_contatto: bool
    consenso_marketing: bool = False
    utm: dict = Field(default_factory=dict)
    fonte: Optional[str] = None


@api_router.post("/quiz-leads")
async def create_quiz_lead(lead: QuizLead):
    if not lead.consenso_contatto:
        raise HTTPException(status_code=422, detail="Consenso al contatto obbligatorio")
    doc = lead.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.quiz_leads.insert_one(doc)
    doc.pop("_id", None)
    return {"ok": True, "percorso": doc["percorso"], "livello": doc["livello"]}


@api_router.get("/quiz-leads")
async def list_quiz_leads(percorso: Optional[str] = None, admin=Depends(require_admin)):
    query = {}
    if percorso:
        query["percorso"] = percorso
    leads = await db.quiz_leads.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return {"leads": leads, "totale": len(leads)}


@api_router.get("/quiz-leads/export")
async def export_quiz_leads(admin=Depends(require_admin)):
    leads = await db.quiz_leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(5000)
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["data", "nome", "telefono", "percorso", "livello", "d1", "d2", "d3", "d4", "altro", "marketing", "utm"])
    for l in leads:
        utm = " ".join(f"{k}={v}" for k, v in (l.get("utm") or {}).items())
        writer.writerow([l.get("created_at", ""), l.get("nome", ""), l.get("telefono", ""), l.get("percorso", ""), l.get("livello", ""), l.get("d1", ""), l.get("d2", ""), l.get("d3", ""), l.get("d4", ""), (l.get("altro_text") or "").replace("\n", " "), l.get("consenso_marketing", False), utm])
    output.seek(0)
    return StreamingResponse(iter([output.getvalue()]), media_type="text/csv", headers={"Content-Disposition": "attachment; filename=contatti-quiz.csv"})


# ---------- Statistiche leggere (privacy-friendly, senza cookie) ----------

ALLOWED_EVENTS = {"pageview", "quiz_start", "quiz_submit", "whatsapp_click", "fresha_click"}


class TrackEvent(BaseModel):
    event: str
    path: Optional[str] = None


@api_router.post("/stats/track")
async def track_event(ev: TrackEvent):
    if ev.event not in ALLOWED_EVENTS:
        raise HTTPException(status_code=422, detail="Evento non valido")
    await db.stats_events.insert_one({
        "event": ev.event,
        "path": (ev.path or "/")[:200],
        "ts": datetime.now(timezone.utc).isoformat(),
    })
    return {"ok": True}


@api_router.get("/stats/summary")
async def stats_summary(admin=Depends(require_admin)):
    now = datetime.now(timezone.utc)
    from collections import Counter

    def since(days):
        return (now - timedelta(days=days)).isoformat()

    events = await db.stats_events.find({"ts": {"$gte": since(30)}}, {"_id": 0}).to_list(20000)
    by_event = Counter(e["event"] for e in events)
    pageviews = [e for e in events if e["event"] == "pageview"]
    top_pages = Counter(e["path"] for e in pageviews).most_common(8)
    last7 = sum(1 for e in pageviews if e["ts"] >= since(7))
    today = now.strftime("%Y-%m-%d")
    oggi = sum(1 for e in pageviews if e["ts"].startswith(today))
    per_giorno = Counter(e["ts"][:10] for e in pageviews)
    leads_total = await db.quiz_leads.count_documents({})
    return {
        "visite_30gg": len(pageviews),
        "visite_7gg": last7,
        "visite_oggi": oggi,
        "quiz_iniziati_30gg": by_event.get("quiz_start", 0),
        "quiz_completati_30gg": by_event.get("quiz_submit", 0),
        "clic_whatsapp_30gg": by_event.get("whatsapp_click", 0),
        "clic_fresha_30gg": by_event.get("fresha_click", 0),
        "lead_totali": leads_total,
        "pagine_top": [{"path": p, "visite": n} for p, n in top_pages],
        "per_giorno": [{"giorno": g, "visite": n} for g, n in sorted(per_giorno.items())],
    }


@api_router.get("/")
async def root():
    return {"message": "Beauty & Care Losone API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup():
    await db.quiz_leads.create_index("created_at")
    await db.login_attempts.create_index("identifier")
    existing = await db.settings.find_one({"_id": "site"})
    if not existing:
        await db.settings.insert_one({"_id": "site", **DEFAULT_SETTINGS})


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
