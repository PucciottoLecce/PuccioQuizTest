# 🔒 Guida Separazione File Pubblici/Privati

## 📋 Panoramica
Il progetto PuccioQuiz è stato riorganizzato per separare i file pubblici da quelli privati contenenti credenziali sensibili.

## 🗂️ Struttura Cartelle

### 📁 **Root (Pubblico)**
File che possono essere deployati su GitHub/Vercel senza rischi:
```
quiz-system/
├── index.html              # Pagina quiz principale
├── ruota2.html             # Ruota della fortuna
├── perso.html              # Pagina perdita
├── config.js               # Configurazione pubblica (senza API keys)
├── email-service.js        # Servizio email (chiamate backend)
├── supabase-config.js     # Configurazione Supabase (senza credenziali)
├── vercel.json            # Configurazione Vercel
├── .gitignore             # Esclusioni Git
├── README.md              # Documentazione
├── GITHUB-DEPLOY-GUIDE.md # Guida deploy
├── WINDSURF-DEPLOY-GUIDE.md # Guida Windsurf
├── DATABASE-RESET-PRODUCTION.sql # Script database
├── DATABASE-RESET.sql      # Script database sviluppo
├── DATABASE-UPDATE.sql     # Script aggiornamenti
├── RLS-TOGGLE.sql        # Script RLS
├── RESEND-SETUP.md       # Guida Resend
├── SETUP-SUPABASE.md      # Guida Supabase
├── EMAILJS-SETUP.md       # Guida EmailJS (legacy)
└── SECURITY-SETUP-GUIDE.md # Questa guida
```

### 🔐 **Private (Privato)**
File con credenziali sensibili - MAI su GitHub:
```
quiz-system/private/
├── config.js              # Credenziali complete (Supabase + Resend)
├── server.js              # Backend server Node.js
├── package.json           # Dipendenze backend
└── .env                  # Variabili ambiente (da creare)
```

## 🔧 Setup Backend

### 1. Installa Dipendenze
```bash
cd private
npm install
```

### 2. Configura Variabili Ambiente
Crea file `.env` in `private/`:
```env
PORT=3000
NODE_ENV=production
```

### 3. Avvia Server Backend
```bash
# Sviluppo
npm run dev

# Produzione
npm start
```

## 🌐 Deploy Backend

### Opzione A: Vercel Serverless
1. Crea account Vercel
2. Deploy cartella `private/`
3. Configura variabili ambiente nel dashboard Vercel

### Opzione B: VPS/Cloud Server
1. Carica cartella `private/` sul server
2. Installa Node.js
3. Esegui `npm install && npm start`

### Opzione C: Railway/Render
1. Connetti repository GitHub
2. Imposta root path a `private/`
3. Deploy automatico

## 🔄 Configurazione Frontend

### Aggiorna URL Backend
In `supabase-config.js`, modifica:
```javascript
const API_CONFIG = {
  BASE_URL: 'https://tuodominio-backend.com', // URL backend deployato
  ENDPOINTS: {
    SAVE_WHEEL_RESULT: '/api/save-wheel-result',
    SEND_EMAIL: '/api/send-email',
    CHECK_ELIGIBILITY: '/api/check-eligibility'
  }
};
```

## 🛡️ Misure di Sicurezza

### ✅ **Cosa è protetto:**
- **API Keys**: Supabase e Resend solo nel backend
- **Database**: Accesso tramite backend solo
- **Credenziali**: Mai esposte lato client
- **Environment variables**: Protette da provider cloud

### 🔒 **Best practices:**
1. **MAI** commitare cartella `private/`
2. **Usare** variabili ambiente per produzione
3. **Rotazione** chiavi API regolarmente
4. **Monitoring** accessi backend
5. **HTTPS** obbligatorio per produzione

## 🚀 Flusso Completo

### 1. Sviluppo Locale
```bash
# Terminal 1: Backend
cd private && npm run dev

# Terminal 2: Frontend ( Windsurf )
# Apri project in Windsurf con Live Server
```

### 2. Deploy Produzione
```bash
# 1. Deploy backend su Vercel/Railway
# 2. Aggiorna URL frontend in supabase-config.js
# 3. Deploy frontend su Vercel
# 4. Test integrazione completa
```

## 📊 Architettura Sicura

```
Frontend (Vercel) → Backend API (Vercel/Railway) → Database (Supabase) → Email (Resend)
     ↓                       ↓                        ↓              ↓
  Pubblico              Protetto               Protetto       Protetto
```

## 🔍 Testing Sicurezza

### 1. Test Locale
```bash
# Verifica che le API keys non siano esposte
curl -s https://tuodominio.com | grep -i "re_.*\|sb_.*"
```

### 2. Test Backend
```bash
# Test endpoint backend
curl -X POST https://tuodominio-backend.com/api/check-eligibility \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## 📞 Supporto

Per problemi di sicurezza:
- **Backend**: Log server in `private/`
- **Frontend**: Console browser DevTools
- **Database**: Dashboard Supabase
- **Email**: Dashboard Resend

---

**⚠️ IMPORTANTE: Mai esporre credenziali nel codice frontend!**
