# Configurazione Supabase per PuccioQuiz

## Prerequisiti
1. Account Supabase (https://supabase.com)
2. Conoscenza base di database SQL

## Passaggi per la configurazione

### 1. Creazione del progetto Supabase
1. Vai su https://supabase.com e crea un nuovo progetto
2. Annota l'URL del progetto e la chiave anonima (Settings > API)

### 2. Configurazione del database
Crea le seguenti tabelle nel tuo database Supabase:

#### Tabella: quiz_participants
```sql
CREATE TABLE quiz_participants (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  score INTEGER NOT NULL,
  answers JSONB,
  q10_answers JSONB,
  gdpr_accepted BOOLEAN NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_quiz_participants_email ON quiz_participants(email);
```

#### Tabella: wheel_spins
```sql
CREATE TABLE wheel_spins (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  prize TEXT NOT NULL,
  token TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_wheel_spins_email ON wheel_spins(email);
CREATE INDEX idx_wheel_spins_ip ON wheel_spins(ip_address);
```

### 3. Configurazione RLS (Row Level Security)
Abilita RLS per entrambe le tabelle:

```sql
-- Abilita RLS
ALTER TABLE quiz_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE wheel_spins ENABLE ROW LEVEL SECURITY;

-- Policy per quiz_participants
CREATE POLICY "Anyone can insert quiz participants" ON quiz_participants
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view their own quiz data" ON quiz_participants
  FOR SELECT USING (true);

-- Policy per wheel_spins
CREATE POLICY "Anyone can insert wheel spins" ON wheel_spins
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view wheel spins" ON wheel_spins
  FOR SELECT USING (true);
```

### 4. Aggiornamento del file supabase-config.js
Apri il file `supabase-config.js` e sostituisci i segnaposto:

```javascript
const SUPABASE_CONFIG = {
  URL: 'https://YOUR_PROJECT_ID.supabase.co',  // Sostituisci con il tuo URL
  ANON_KEY: 'YOUR_ANON_KEY'  // Sostituisci con la tua chiave anonima
};
```

### 5. Test del sistema
1. Apri `index.html` in un browser
2. Compila il quiz con email valida
3. Verifica che:
   - Se rispondi correttamente a tutte le domande → reindirizzamento a `ruota.html`
   - Se anche solo una risposta è sbagliata → reindirizzamento a `perso.html`
4. Controlla nella console per eventuali errori

## Flusso del sistema

### Index.html (Quiz principale)
- **Risposte tutte corrette** → `ruota.html?email=...`
- **Anche una sola risposta sbagliata** → `perso.html?email=...`

### Perso.html
- Mostra le risposte sbagliate
- Messaggio di incoraggiamento per partecipare di persona

### Ruota.html
- Verifica eleggibilità (email/IP non già utilizzati)
- Permette di girare la ruota una sola volta
- Salva il risultato nel database

## Troubleshooting

### Errori comuni
1. **"Supabase non è caricato"**: Assicurati che gli script siano caricati nell'ordine corretto
2. **"Backend non configurato correttamente"**: Verifica le credenziali Supabase
3. **Errore CORS**: Configura correttamente le policy RLS in Supabase

### Debug
- Apri la console del browser (F12)
- Controlla la tab Network per vedere le chiamate API
- Verifica i dati nel dashboard Supabase

## Note di sicurezza
1. Le chiavi Supabase sono visibili nel frontend (è normale)
2. RLS protegge l'accesso non autorizzato ai dati
3. Le email sono uniche nel database
4. Gli IP vengono tracciati per prevenire abusi

## Backup
Supabase offre backup automatici, ma è buona pratica:
1. Esportare periodicamente i dati
2. Monitorare l'utilizzo del database
3. Configurare alert per attività sospette
