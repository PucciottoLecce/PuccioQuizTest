# 🖥️ Guida Deploy con Windsurf

## 🚀 Metodo 1: Git Integration in Windsurf

### Step 1: Apri il Source Control
1. In Windsurf, guarda a sinistra nel pannello
2. Click sull'icona **Git** (solitamente a forma di ramo)
3. Oppure: **View** → **Source Control** (o `Ctrl+Shift+G`)

### Step 2: Inizializza Repository
1. Click su **"Initialize Repository"**
2. Seleziona la cartella `quiz-system`
3. Windsurf creerà automaticamente il repository Git

### Step 3: Commit Iniziale
1. Nel pannello Source Control, vedrai tutti i file
2. Click su **"+"** accanto a "Changes" per aggiungere tutti i file
3. Scrivi nel messaggio: `Initial commit - PuccioQuiz complete system`
4. Click su **"Commit"** (icona del checkmark)

### Step 4: Pubblica su GitHub
1. Dopo il commit, vedrai un'opzione **"Publish to GitHub"**
2. Click su **"Publish to GitHub"**
3. Si aprirà una finestra:
   - **Repository name**: `puccioquiz`
   - **Description**: `PuccioQuiz - Sistema Quiz con Ruota della Fortuna`
   - **Private**: ❌ (lascia pubblico per Vercel)
4. Click su **"Publish Repository"**

## 🔄 Metodo 2: Terminal Windsurf (se il primo non funziona)

### Step 1: Apri Terminal
1. In Windsurf: **Ctrl+`** (Ctrl backtick)
2. Si aprirà il terminale in basso

### Step 2: Comandi Git
```bash
# Naviga nella cartella del progetto (se necessario)
cd "c:\Users\andre\OneDrive\Desktop\PuccioQUIZ\quiz-system"

# Inizializza Git
git init

# Configura Git (prima volta)
git config --global user.name "Il Tuo Nome"
git config --global user.email "la.tua.email@example.com"

# Aggiungi tutti i file
git add .

# Primo commit
git commit -m "Initial commit - PuccioQuiz complete system"

# Crea repository su GitHub (manuale)
# 1. Vai su github.com → New repository → "puccioquiz"
# 2. Copia l'URL del repository

# Collega al repository remoto
git remote add origin https://github.com/TUO_USERNAME/puccioquiz.git

# Push su GitHub
git branch -M main
git push -u origin main
```

## 🌐 Step 5: Deploy su Vercel

### Opzione A: Da Vercel.com
1. Vai su [vercel.com](https://vercel.com)
2. Login con GitHub
3. Click "Add New..." → "Project"
4. Seleziona `puccioquiz` dalla lista
5. Click "Import" → "Deploy"

### Opzione B: Con Vercel CLI
```bash
# Installa Vercel CLI
npm i -g vercel

# Nella cartella del progetto
vercel --prod
```

## 🔍 Troubleshooting Windsurf Git

### "Publish to GitHub" non appare?
1. **Verifica che ci sia un commit**
2. **Controlla che il repository sia inizializzato**
3. **Riavvia Windsurf**

### Errori di autenticazione GitHub
1. In Windsurf: **File** → **Preferences** → **Settings**
2. Cerca "Git: Authentication"
3. Configura con GitHub token

### Problemi con il terminal
1. Usa **PowerShell** invece di CMD
2. Verifica che Git sia installato: `git --version`

## ✅ Verifica Successo

### Controlla su GitHub
1. Vai su `github.com/TUO_USERNAME/puccioquiz`
2. Dovresti vedere tutti i file del progetto

### Controlla su Vercel
1. Dopo il deploy, avrai un URL tipo:
   `https://puccioquiz-tuocusername.vercel.app`

## 🎯 Tips per Windsurf

### Shortcuts utili
- **Source Control**: `Ctrl+Shift+G`
- **Terminal**: `Ctrl+` (Ctrl backtick)
- **Command Palette**: `Ctrl+Shift+P`

### Estensioni utili
Cerca in Extensions:
- **GitLens** (migliora visibilità Git)
- **GitHub Pull Requests** (integrazione GitHub)
- **Live Server** (per test locale)

---

**Problemi? Controlla la console di Windsurf per errori specifici!** 🚀
