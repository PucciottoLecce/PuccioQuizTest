# 🚀 Guida Deploy GitHub-Vercel

## 📋 Prerequisiti
- Account GitHub
- Account Vercel
- Progetto PuccioQuiz pronto

## 🔧 Step 1: Repository GitHub

### 1.1 Crea Repository
1. Vai su [GitHub](https://github.com)
2. Click "New repository"
3. **Repository name**: `puccioquiz`
4. **Description**: `PuccioQuiz - Sistema Quiz con Ruota della Fortuna`
5. **Public**: ✅ (per deploy Vercel gratuito)
6. **Add README**: ❌ (già creato)
7. **Add .gitignore**: ❌ (già creato)
8. Click "Create repository"

### 1.2 Carica File Locali
```bash
# Nella cartella del progetto
git init
git add .
git commit -m "Initial commit - PuccioQuiz complete system"

# Collega al repository remoto
git remote add origin https://github.com/TUO_USERNAME/puccioquiz.git
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Vercel Setup

### 2.1 Connetti GitHub
1. Vai su [Vercel](https://vercel.com)
2. Login con account GitHub
3. Click "Add New..." → "Project"

### 2.2 Importa Repository
1. Cerca `puccioquiz` nella lista
2. Click "Import"
3. **Framework Preset**: "Other"
4. **Root Directory**: `.` (default)
5. **Build Command**: lascia vuoto
6. **Output Directory**: lascia vuoto
7. **Install Command**: lascia vuoto

### 2.3 Variabili d'Ambiente
**NON AGGIUNGERE VARIABILI** - il progetto usa hardcoded config

### 2.4 Deploy
1. Click "Deploy"
2. Attendi il completamento
3. Il sito sarà disponibile a: `https://puccioquiz-tuocusername.vercel.app`

## ⚙️ Step 3: Configurazione Post-Deploy

### 3.1 Custom Domain (Opzionale)
1. In Vercel dashboard → Project Settings
2. Click "Domains"
3. Aggiungi il tuo dominio personalizzato
4. Configura i DNS come indicato

### 3.2 Database Supabase
Assicurati che il database sia aggiornato:

```sql
-- Esegui su Supabase SQL Editor
ALTER TABLE wheel_spins ADD COLUMN IF NOT EXISTS prize_token TEXT;
```

## 🔍 Step 4: Test Deploy

### 4.1 Verifica Funzionalità
1. **Homepage**: `https://tuodominio.vercel.app`
2. **Quiz completo**: Rispondi a tutte le domande
3. **Ruota**: Verifica funzionamento e blocco
4. **Email**: Controlla invio email vincite

### 4.2 Debug Console
1. Apri DevTools del browser
2. Controlla errori nella console
3. Verifica chiamate Supabase

## 🚨 Troubleshooting

### Problemi Comuni

#### 1. Build Failed
- **Causa**: File mancanti o configurazione errata
- **Soluzione**: Verifica tutti i file presenti nel repository

#### 2. Supabase Connection Error
- **Causa**: Credenziali errate o RLS attivo
- **Soluzione**: Verifica URL e chiave in `supabase-config.js`

#### 3. Email Non Inviate
- **Causa**: DNS Resend non propagato
- **Soluzione**: Attendi 24-48 ore per propagazione DNS

#### 4. Ruota Non Funziona
- **Causa**: JavaScript errori o CORS
- **Soluzione**: Verifica console browser per errori

### Logs Vercel
1. Vercel Dashboard → Project
2. Tab "Logs"
3. Controlla errori runtime

## 🔄 CI/CD Automatico

Ogni `git push` al branch `main`:
1. **Vercel** rileva automaticamente
2. **Build** il progetto
3. **Deploy** alla nuova versione
4. **Notifica** successo/errore

## 📊 Monitoraggio

### Vercel Analytics
- Visitatori unici
- Performance pagina
- Error rate
- Geographic distribution

### Supabase Dashboard
- Connessioni database
- Query performance
- Storage usage

## 🎯 Best Practices

### 1. Version Control
- Usa branch `main` per produzione
- Crea branch `develop` per test
- Usa commit message descrittivi

### 2. Performance
- Ottimizza immagini
- Minifica CSS/JS
- Usa CDN Vercel

### 3. Security
- Mantieni .gitignore aggiornato
- Non esporre credenziali sensibili
- Monitora accessi sospetti

---

## 📞 Supporto

Per problemi di deploy:
- **Vercel**: vercel.com/docs
- **GitHub**: github.com/help
- **PuccioQuiz**: Controlla README.md

**Deploy completato! 🚀**
