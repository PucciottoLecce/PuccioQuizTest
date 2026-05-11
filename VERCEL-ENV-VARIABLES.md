# 🔐 Variabili Ambiente Vercel - PuccioQuiz Backend

## 📋 **Credenziali Complete**

### 🗄️ **Supabase Database**
```
SUPABASE_URL=https://pluwvwjzhthfmpcjqexr.supabase.co
SUPABASE_ANON_KEY=sb_publishable_HTqdpCApO4Y1QbOO6XChDA_Q4RIIHl1
```

### 📧 **Resend Email Service**
```
RESEND_API_KEY=re_RNexCFXA_7FnDwwk72iJtUE9UENaG8n74
RESEND_FROM_EMAIL=noreply@puccioquiz.it
```

### ⚙️ **Server Configuration**
```
NODE_ENV=production
PORT=3000
```

---

## 🚀 **Setup Vercel Dashboard**

### 1. **Vai su Vercel**
1. Accedi a [vercel.com/dashboard](https://vercel.com/dashboard)
2. Seleziona progetto `PuccioQuizWin`
3. Vai su **Settings** → **Environment Variables**

### 2. **Aggiungi Tutte le Variabili**
Copia e incolla ogni variabile:

#### **Supabase**
| Variable Name | Value | Environment |
|--------------|--------|-------------|
| `SUPABASE_URL` | `https://pluwvwjzhthfmpcjqexr.supabase.co` | Production |
| `SUPABASE_ANON_KEY` | `sb_publishable_HTqdpCApO4Y1QbOO6XChDA_Q4RIIHl1` | Production |

#### **Resend**
| Variable Name | Value | Environment |
|--------------|--------|-------------|
| `RESEND_API_KEY` | `re_RNexCFXA_7FnDwwk72iJtUE9UENaG8n74` | Production |
| `RESEND_FROM_EMAIL` | `noreply@puccioquiz.it` | Production |

#### **Server**
| Variable Name | Value | Environment |
|--------------|--------|-------------|
| `NODE_ENV` | `production` | Production |
| `PORT` | `3000` | Production |

### 3. **Salva e Deploy**
1. Click "**Save**" per ogni variabile
2. Triggera nuovo deploy dal dashboard
3. Attendi completamento

---

## 🔒 **Sicurezza delle Credenziali**

### ✅ **Cosa è Protetto**
- **Database URL**: Solo in ambiente Vercel
- **API Keys**: Mai esposte nel frontend
- **Email Service**: Credenziali isolate
- **Server Config**: Variabili ambiente production

### 🛡️ **Best Practices**
1. **MAI** condividere queste credenziali
2. **Rotazione chiavi**: Cambiare ogni 90 giorni
3. **Monitoring**: Controllare accessi anomali
4. **Backup**: Salvare copia sicura delle credenziali

---

## 🧪 **Test Configurazione**

### 1. **Verifica Variabili**
Dopo il deploy, testa con:

```bash
# Test backend
curl https://puccioquiz-backend.vercel.app/

# Test API con autenticazione
curl -X POST https://puccioquiz-backend.vercel.app/api/check-eligibility \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 2. **Test Database**
```bash
# Test connessione Supabase
curl -X POST https://puccioquiz-backend.vercel.app/api/save-wheel-result \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","prize":"test","prize_token":"TEST123"}'
```

### 3. **Test Email**
```bash
# Test invio email
curl -X POST https://puccioquiz-backend.vercel.app/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test","html":"<p>Test</p>"}'
```

---

## 📊 **Monitoraggio e Debug**

### 🔍 **Logs Vercel**
1. Vai su **Functions** tab nel dashboard
2. Controlla errori runtime
3. Verifica variabili ambiente caricate

### 🐛 **Debug Mode**
Per debugging, aggiungi temporaneamente:
```
DEBUG_MODE=true
LOG_LEVEL=verbose
```

---

## 🔄 **Aggiornamenti Manutenzione**

### 📅 **Rotazione Chiavi (Consigliato)**
- **Resend API Key**: Ogni 90 giorni
- **Supabase Keys**: Annualmente
- **Password Database**: Trimestralmente

### 📝 **Checklist Sicurezza**
- [ ] Chiavi attive e funzionanti
- [ ] Nessuna chiave esposta in repository
- [ ] Accessi monitorati
- [ ] Backup credenziali aggiornato
- [ ] Logging attivo in produzione

---

## 🚨 **Emergenza**

### 🆘 **Compromissione Credenziali**
Se sospetti compromissione:

1. **Immediatamente** revoca chiavi in:
   - Dashboard Supabase
   - Dashboard Resend

2. **Genera nuove chiavi**
3. **Aggiorna Vercel** con nuove credenziali
4. **Deploy forzato** per applicare cambiamenti

5. **Monitora** accessi sospetti per 72 ore

### 📞 **Contatti Supporto**
- **Supabase**: [Dashboard Support](https://supabase.com/dashboard/support)
- **Resend**: [Support Center](https://resend.com/support)
- **Vercel**: [Help Center](https://vercel.com/help)

---

**🔐 Le credenziali sono configurate per deploy sicuro su Vercel!**
