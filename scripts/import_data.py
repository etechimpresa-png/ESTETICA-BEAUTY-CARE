"""Importa nel database del NUOVO progetto i dati esportati in questa cartella.
Uso (dall'account/progetto della cliente):  cd /app/backend && python3 /app/scripts/import_data.py
"""
import os
import json
import glob
from pymongo import MongoClient

client = MongoClient(os.environ.get("MONGO_URL", "mongodb://localhost:27017"))
db = client[os.environ.get("DB_NAME", "test_database")]

for path in sorted(glob.glob("/app/scripts/db_export/*.json")):
    coll = os.path.basename(path).replace(".json", "")
    with open(path) as f:
        docs = json.load(f)
    if not docs:
        continue
    for d in docs:
        d.pop("_id", None)
    esistenti = db[coll].count_documents({})
    if esistenti > 0:
        print(f"{coll}: SALTATA (contiene già {esistenti} documenti)")
        continue
    db[coll].insert_many(docs)
    print(f"{coll}: importati {len(docs)} documenti")

print("Importazione completata.")
