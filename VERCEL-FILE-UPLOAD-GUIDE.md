# 📁 Guida Caricamento File su Vercel

## 🎯 **File da Caricare su Vercel**

### 📋 **Due Deploy Separati**

#### **🌐 DEPLOY 1: Frontend (Pubblico)**
**Repository**: `PuccioQuizWin`  
**Root Directory**: `/` (root del repository)  
**File da includere**:

```
✅ index.html              # Quiz principale
✅ ruota2.html             # Ruota della fortuna
✅ perso.html              # Pagina perdita
✅ config.js               # Configurazione pubblica
✅ email-service.js        # Servizio email (chiamate backend)
✅ supabase-config.js     # Configurazione Supabase (senza credenziali)
✅ audio-manager.js        # Sistema audio
✅ vercel.json            # Configurazione Vercel
✅ README.md               # Documentazione
✅ .gitignore              # Esclusioni Git
✅ GITHUB-DEPLOY-GUIDE.md  # Guide deploy
✅ WINDSURF-DEPLOY-GUIDE.md # Guide Windsurf
✅ SECURITY-SETUP-GUIDE.md # Guida sicurezza
✅ AUDIO-SETUP-GUIDE.md    # Guida audio
✅ RESEND-SETUP.md         # Configurazione email
✅ SETUP-SUPABASE.md       # Configurazione database
✅ DATABASE-*.sql          # Script database
✅ RLS-TOGGLE.sql          # Script security
✅ VERCEL-*.md             # Guide Vercel
```

**🚫 File da ESCLUDERE**:
```
❌ private/                # Cartella backend (file privati)
❌ .env                    # Variabili ambiente
❌ node_modules/           # Dipendenze backend
❌ package-lock.json       # Lock file backend
```

---

#### **🔐 DEPLOY 2: Backend (Privato)**
**Repository**: `PuccioQuizWin`  
**Root Directory**: `private`  
**File da includere**:

```
✅ server.js               # Backend server
✅ package.json            # Dipendenze backend
✅ config.js               # Credenziali complete
```

**🚫 File da ESCLUDERE**:
```
❌ Tutti gli altri file     # Solo cartella private/
❌ .env                    # Variabili ambiente (configurate in Vercel)
❌ node_modules/           # Installato automaticamente
```

---

## 🚀 **Procedura Completa**

### **Passo 1: Deploy Frontend**
1. **Vai su Vercel Dashboard**
2. **Add New Project** → Importa `PuccioQuizWin`
3. **Root Directory**: `/` (lascia vuoto/default)
4. **Framework Preset**: `Other`
5. **Build Command**: vuoto
6. **Output Directory**: vuoto
7. **Add Environment Variables** (nessuna per frontend)
8. **Deploy**

**URL Risultato**: `https://puccioquizwin.vercel.app`

---

### **Passo 2: Deploy Backend**
1. **Add New Project** → Importa `PuccioQuizWin`
2. **Root Directory**: `private`
3. **Framework Preset**: `Other`
4. **Build Command**: `npm install`
5. **Output Directory**: vuoto
6. **Add Environment Variables**:

```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://pluwvwjzhthfmpcjqexr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_HTqdpCApO4Y1QbOO6XChDA_Q4RIIHl1
RESEND_API_KEY=re_RNexCFXA_7FnDwwk72iJtUE9UENaG8n74
RESEND_FROM_EMAIL=noreply@puccioquiz.it
```

7. **Deploy**

**URL Risultato**: `https://puccioquiz-backend.vercel.app`

---

## 🔗 **Aggiorna Frontend per Backend**

### **Modifica supabase-config.js**
```javascript
const API_CONFIG = {
  BASE_URL: 'https://puccioquiz-backend.vercel.app',
  ENDPOINTS: {
    SAVE_WHEEL_RESULT: '/api/save-wheel-result',
    SEND_EMAIL: '/api/send-email',
    CHECK_ELIGIBILITY: '/api/check-eligibility'
  }
};
```

### **Push Aggiornamento**
```bash
git add supabase-config.js
git commit -m "Update backend URL for Vercel deployment"
git push origin main
```

---

## 📊 **Riepilogo Deploy**

| Componente | Repository | Root Directory | URL |
|-----------|-----------|----------------|-----|
| **Frontend** | PuccioQuizWin | `/` | `https://puccioquizwin.vercel.app` |
| **Backend** | PuccioQuizWin | `private` | `https://puccioquiz-backend.vercel.app` |

---

## 🧪 **Test Completo**

### **1. Test Frontend**
- Apri `https://puccioquizwin.vercel.app`
- Verifica caricamento pagine
- Controlla audio funzionante

### **2. Test Backend**
```bash
curl https://puccioquiz-backend.vercel.app/
```

### **3. Test Integrazione**
- Completa il quiz
- Verifica salvataggio database
- Controlla invio email

---

## 🎯 **Architettura Finale**

```
Frontend (Vercel) → Backend API (Vercel) → Database (Supabase) → Email (Resend)
     ↓                    ↓                        ↓              ↓
  Pubblico            Protetto               Protetto       Protetto
```

---

**🚀 Carica questi file su Vercel seguendo la guida per deploy completo!**
