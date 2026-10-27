# PRD – Estetica Beauty & Care Losone

## Problem statement originale
"Crea un nuovo sito internet seguendo le istruzioni dentro al file – nome progetto: beauty Care Losone" (brief PDF: Brief_Emergent_Sito_Beauty_Care_Losone.pdf, v1.0 ottobre 2026).

## Scelte dell'utente (27.10.2026)
- Costruire Fasi 1+2+3 insieme (struttura, contenuti, quiz).
- Dati dei percorsi locali finché non arrivano le credenziali Shopify (Fase 4).
- Segnaposto [DA INSERIRE] visibili per WhatsApp, Fresha, contatti.

## Personas
- Donna 35+ / over 50 del Locarnese (principale): leggibilità, pochi passaggi, pulsanti grandi.
- Turiste/i di lingua tedesca (secondario, Fase 5: traduzioni).
- Susana (titolare): gestisce contatti quiz e interruttori da /admin.

## Requisiti core (statici, dal brief)
- Quiz 4 domande (Tabelle A e B) → percorso + livello + secondo percorso → consulenza gratuita via WhatsApp.
- 12 percorsi in 3 livelli con prezzi CHF fissi; sconto QUIZ10 solo livello 1.
- Priorità contenuto: CORPO prima di tutto; poi viso (Metodo Rosa).
- Mai promesse mediche; drenaggio linfatico "a fini estetici"; niente urgenza/countdown.
- Menu: Corpo · Viso · Percorsi · Susana · Servizi · Buoni regalo · Contatti + CTA quiz.

## Architettura
- React (CRA/craco) + Tailwind + framer-motion + lenis; FastAPI + MongoDB (motor).
- Backend: percorsi_data.py (catalogo locale), /api/quiz-leads (+export CSV), /api/settings (interruttori), /api/auth/login (JWT admin, brute-force lockout).
- Palette: rosa antico #B86A75, crema #FAF7F2, salvia #8A9A85, antracite #2C2A29. Font: Cormorant Garamond + Plus Jakarta Sans.

## Implementato (27.10.2026)
- Fase 1: layout, design, menu, footer, pulsante WhatsApp fisso, pulsante quiz sticky, pagine della mappa, interruttori (in Mongo, gestibili da /admin).
- Fase 2: contenuti Homepage, /corpo, /viso, /susana, /percorsi (+dettaglio), /servizi, /buoni-regalo, /contatti, /link, /grazie, legali — con segnaposto [DA INSERIRE] dove manca materiale.
- Fase 3: quiz completo (pop-up auto dopo 2,5s, ?quiz=1, logica A+B, testate 352 combinazioni), pagina /risultato dinamica, messaggio WhatsApp precompilato, salvataggio lead, /admin con filtri + export CSV + interruttori.
- Admin: susana@beautycare-losone.ch / BeautyCare2026! (test, da cambiare).

## Backlog prioritizzato
- P0 (Fase 4): collegamento Shopify (credenziali utente) — carrello, checkout, QUIZ10, clienti con tag, /grazie da ordine reale, collezione in-evidenza da Shopify.
- P0: inserire numero WhatsApp, link Fresha (consulenza, buoni), telefono, email → via /api/settings o admin.
- P1 (Fase 5): traduzioni DE/FR/EN (Weglot), Meta Pixel + CAPI, GA4, banner cookie, dati strutturati SEO.
- P1: foto reali (shooting), logo vettoriale, recensioni autorizzate, listino Fresha completo (66 voci), testi macchinari validati, attestati scansione.
- P2: pagine /prodotti, /formazione, /open-day (interruttori pronti); pagamento a rate (decisione aperta); Fase 6 checklist lancio.

## Prossimi task
1. Raccogliere da utente: numero WhatsApp, link Fresha, contatti.
2. Collegare Shopify quando arrivano le credenziali.
3. Sostituire segnaposto con materiali reali.
