# 🚀 Setup Backend Vercel Manuale

## 📋 Panoramica
Guida dettagliata per deploy manuale del backend PuccioQuiz su Vercel senza usare terminale.

## 🔧 **Prerequisiti**

### ✅ **Account Vercel**
- Account Vercel attivo ([vercel.com](https://vercel.com))
- Connesso a GitHub
- Piano gratuito o Pro

### ✅ **File Backend Pronti**
- Cartella `private/` completa
- `package.json` configurato
- `server.js` funzionante

---

## 🌐 **Deploy Backend su Vercel**

### 1. **Crea Nuovo Progetto Vercel**
1. Vai su [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "**Add New...**" → "**Project**"
3. **Importa da GitHub**: Seleziona `PuccioQuizWin`
4. Click "**Import**"

### 2. **Configura Root Directory**
1. **Root Directory**: Imposta `private`
2. **Framework Preset**: Seleziona "**Other**"
3. **Build Command**: Lascia vuoto o `npm install`
4. **Output Directory**: Lascia vuoto
5. Click "**Continue**"

### 3. **Configura Variabili Ambiente**
Nella schermata "Environment Variables", aggiungi:

```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://pluwvwjzhthfmpcjqexr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_HTqdpCApO4Y1QbOO6XChDA_Q4RIIHl1
RESEND_API_KEY=re_RNexCFXA_7FnDwwk72iJtUE9UENaG8n74
RESEND_FROM_EMAIL=noreply@puccioquiz.it
```

### 4. **Deploy**
1. Click "**Deploy**"
2. Attendi completamento deploy
3. Copia URL del backend (es: `https://puccioquiz-backend.vercel.app`)

---

## 🔗 **Aggiorna Frontend**

### 1. **Modifica supabase-config.js**
Apri `supabase-config.js` e aggiorna:

```javascript
const API_CONFIG = {
  BASE_URL: 'https://TUO-BACKEND-URL.vercel.app', // URL del tuo backend Vercel
  ENDPOINTS: {
    SAVE_WHEEL_RESULT: '/api/save-wheel-result',
    SEND_EMAIL: '/api/send-email',
    CHECK_ELIGIBILITY: '/api/check-eligibility'
  }
};
```

### 2. **Push delle Modifiche**
```bash
git add supabase-config.js
git commit -m "Update backend URL for Vercel deployment"
git push origin main
```

---

## 🛠️ **Configurazione Dettagliata Vercel**

### 📁 **Struttura Progetto**
```
PuccioQuizWin/
├── private/           ← Root directory per Vercel
│   ├── server.js      ← Entry point
│   ├── package.json   ← Dipendenze
│   └── config.js      ← Credenziali
├── index.html         ← Frontend (deploy separato)
├── ruota2.html       ← Frontend
└── ...altri file
```

### ⚙️ **vercel.json nella Root**
Crea `vercel.json` nella root del repository:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "private/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/private/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## 🔒 **Sicurezza Backend**

### 🛡️ **Variabili Ambiente Protette**
- ✅ **Nessuna API key** nel codice
- ✅ **Credenziali** solo in Vercel
- ✅ **Accesso sicuro** tramite HTTPS

### 🔐 **Best Practices**
1. **MAI** esporre variabili ambiente
2. **Usare** sempre `process.env.VAR`
3. **Validare** input API
4. **Loggare** accessi per debugging

---

## 🧪 **Test Backend**

### 1. **Verifica Endpoint**
Testa il backend deployato:

```bash
# Test endpoint salute
curl https://TUO-BACKEND-URL.vercel.app/

# Test API
curl -X POST https://TUO-BACKEND-URL.vercel.app/api/check-eligibility \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 2. **Test Integrazione**
1. Apri `index.html` nel browser
2. Compila il quiz
3. Verifica chiamate API nella console
4. Controlla salvataggio database

---

## 🐛 **Troubleshooting**

### ❌ **Errore 404**
- **Causa**: Root directory errata
- **Fix**: Imposta `private` come root in Vercel

### ❌ **Errore 500**
- **Causa**: Variabili ambiente mancanti
- **Fix**: Verifica tutte le env variables in Vercel

### ❌ **CORS Error**
- **Causa**: Frontend e backend domini diversi
- **Fix**: Aggiungi CORS origin corretto in `server.js`

### ❌ **Database Error**
- **Causa**: Credenziali Supabase errate
- **Fix**: Verifica URL e API key nelle env variables

---

## 📊 **Monitoraggio**

### 📈 **Dashboard Vercel**
1. **Functions Tab**: Logs backend
2. **Analytics**: Performance e accessi
3. **Settings**: Configurazione

### 🔍 **Logs Backend**
```javascript
// In server.js, aggiungi logging
console.log('API Request:', req.method, req.path);
console.log('Environment:', process.env.NODE_ENV);
```

---

## 🚀 **Deploy Completo**

### ✅ **Frontend + Backend**
1. **Frontend**: `https://puccioquizwin.vercel.app`
2. **Backend**: `https://puccioquiz-backend.vercel.app`
3. **Database**: Supabase
4. **Email**: Resend

### 🎯 **URL Finali**
- **Quiz**: `https://puccioquizwin.vercel.app`
- **API**: `https://puccioquiz-backend.vercel.app/api/*`

---

**🎉 Il PuccioQuiz è ora completamente deployato con backend sicuro!**
