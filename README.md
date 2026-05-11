# 🎯 PuccioQuiz - Sistema Quiz con Ruota della Fortuna

## 📋 Descrizione
PuccioQuiz è un sistema interattivo di quiz con ruota della fortuna che permette agli utenti di vincere premi. Il sistema include:

- **Quiz interattivo** con domande casuali sulla cultura salentina
- **Ruota della fortuna** con probabilità personalizzate
- **Sistema anti-frode** con validazione email unica
- **Invio email automatico** con token di vincita
- **Database Supabase** per salvataggio risultati

## 🚀 Deploy Guida

### 1. Repository GitHub
1. Crea un nuovo repository su GitHub
2. Carica tutti i file del progetto
3. Assicurati che `index.html` sia il file principale

### 2. Vercel Setup
1. Connetti il tuo account Vercel a GitHub
2. Importa il repository PuccioQuiz
3. Configura le variabili d'ambiente:

```
VITE_SUPABASE_URL=tua_url_supabase
VITE_SUPABASE_ANON_KEY=tua_chiave_anonima_supabase
```

### 3. Configurazione Database
Esegui questo script SQL su Supabase:

```sql
ALTER TABLE wheel_spins ADD COLUMN IF NOT EXISTS prize_token TEXT;
```

## 📁 Struttura Progetto

```
quiz-system/
├── index.html              # Pagina principale quiz
├── ruota2.html            # Ruota della fortuna
├── perso.html             # Pagina per chi perde
├── supabase-config.js    # Configurazione database
├── email-service.js      # Servizio email Resend
├── config.js             # Configurazione principale
├── DATABASE-RESET-PRODUCTION.sql  # Script database
└── README.md             # Questo file
```

## ⚙️ Configurazione

### Supabase
- URL: Da inserire in `supabase-config.js`
- Chiave anonima: Da inserire in `supabase-config.js`
- Tabella `wheel_spins` con colonna `prize_token`

### Resend Email
- API Key: `re_RNexCFXA_7FnDwwk72iJtUE9UENaG8n74`
- Dominio: `noreply@puccioquiz.it`
- Template: HTML personalizzato per vincite

## 🎮 Funzionalità

### Quiz
- 9 domande casuali sulla cultura salentina
- Risposte mescolate dinamicamente
- Validazione in tempo reale

### Ruota della Fortuna
- 4 premi: Pucciotto (10%), Maglietta (5%), Crocchettone (45%), Portachiavi (40%)
- Colori alternati rosso/nero
- Blocco permanente dopo primo utilizzo

### Sistema Anti-Frode
- Validazione email unica
- Controllo IP address
- Token univoco per vincita
- Una sola partecipazione per email

## 🛠️ Tecnologie

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Database**: Supabase (PostgreSQL)
- **Email**: Resend API
- **Deploy**: Vercel
- **Version Control**: GitHub

## 📧 Email System

Le email vengono inviate automaticamente quando un utente vince:

1. **Generazione token**: Unico per ogni vincita
2. **Salvataggio database**: Token salvato in `wheel_spins.prize_token`
3. **Invio email**: Template HTML professionale
4. **Tracking**: Stato invio monitorato

## 🔒 Sicurezza

- **Row Level Security** (RLS) abilitato su Supabase
- **Validazione input** lato client e server
- **Token crittografati** per prevenire frodi
- **Rate limiting** implicito per email

## 🌐 Deploy Online

Una volta deployato su Vercel:

1. **URL produzione**: `https://tuodominio.vercel.app`
2. **HTTPS automatico**
3. **CI/CD integrato** con GitHub
4. **Monitoraggio performance** Vercel Analytics

## 📞 Supporto

Per assistenza tecnica:
- 📧 Email: `info@puccioquiz.it`
- 🐛 Issues: GitHub repository issues
- 📖 Documentazione: Questo README

---

**PuccioQuiz © 2026** - Tutti i diritti riservati
