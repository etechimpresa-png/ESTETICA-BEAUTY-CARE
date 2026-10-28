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

## Implementato (28.10.2026)
- Listino /servizi riscritto con 97 servizi reali estratti da Fresha (prezzi e durate), ogni riga con pulsante "Prenota su Fresha" collegato al listino prenotazioni del centro.
- Prezzi percorsi allineati a Fresha dove il servizio base era diverso: Sguardo L1 CHF 20 (regolazione sopracciglia), L2 CHF 152; Mani e piedi L1 CHF 40, L2 CHF 95, L3 CHF 324; Corpo tonico L1 CHF 130 (radiofrequenza), L2 CHF 275, L3 CHF 783. DA CONFERMARE: laser-senza-pensieri (Fresha zona piccola da CHF 10 vs brief CHF 80) e "trattamento viso CHF 185" non presente su Fresha.
- Attestati veri pubblicati su /susana (O-LRNIS pigmentazione 13.10.2025; laser+cellulite 18.11.2024) con data di nascita oscurata. Certificato RME NON pubblicato: scaduto 12.04.2026, in attesa di rinnovo (come da brief).
- Paragrafo "storia di Susana" + elenco competenze su /susana.
- Galleria lavori reali: Home (6 foto miste) e /corpo (8 collage prima/dopo corpo). Saltati 2 video .mov nello zip.
- Spazi pronti: 4 slot linea prodotti rosa damascena su /viso; 3 slot foto negozio su /contatti.
- Assets: /app/frontend/public/assets/attestati (3) e /assets/lavori (19, HEIC convertiti in JPG).

## Aggiornamento foto (28.10.2026, seconda passata)
- Tutte le 19 foto prima/dopo in uso: 13 corpo su /corpo (sezione spostata subito dopo l'hero, prima dell'elenco servizi), 6 labbra/sopracciglia su /percorsi/sguardo; le migliori anche in Home.
- Foto recuperate dal vecchio sito esteticabeautycare.com (/assets/centro/): ritratto di Susana (pagina Susana + blocco Home), ricezione del centro (Contatti), foto massaggio (hero Corpo), foto trattamento viso (hero Viso), 3 foto prodotti alla rosa damascena (sezione linea prodotti su /viso).
- Telefono del centro impostato: 091 730 10 77 (dal vecchio sito).

## Aggiornamento prenotazioni e prodotti (28.10.2026, terza passata)
- DECISIONE UTENTE: i percorsi NON si vendono via Shopify per ora — ogni livello di ogni percorso ha il pulsante "Prenota su Fresha" collegato al listino prenotazioni del centro. Testo "Come funziona" aggiornato (prenotazione, non acquisto online). Codice QUIZ10 applicato alla prima prenotazione in centro.
- Foto prodotti sostituite con le 4 foto professionali caricate dall'utente (/assets/centro/prod-linea-01..04.jpg) su /viso e nel blocco Metodo Rosa della Home.

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
