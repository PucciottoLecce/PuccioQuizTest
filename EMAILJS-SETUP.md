# CONFIGURAZIONE EMAILJS PER INVIO EMAIL REALI

## 🚀 Guida rapida per configurare EmailJS

### 1. Registrati su EmailJS
1. Vai su [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea un account gratuito (limite: 200 email/mese)
3. Verifica la tua email

### 2. Crea un Email Service
1. Vai a **Email Services** nel dashboard
2. Clicca **Add New Service**
3. Scegli un provider (es: Gmail, Outlook, etc.)
4. Segui le istruzioni per collegare il tuo account email

### 3. Crea un Email Template
1. Vai a **Email Templates** nel dashboard
2. Clicca **Create New Template**
3. Usa questo template:

```
Subject: Complimenti! Hai vinto un premio da PuccioQuiz!

Content:
Ciao {{to_email}},

Complimenti! Hai vinto: {{prize_name}}

Il tuo codice premio unico è: {{prize_token}}

Presenta questo codice in negozio per ritirare il tuo premio.

Il codice è valido per {{expiry_days}} giorni e può essere utilizzato una sola volta.

Per assistenza, contatta: {{contact_email}}

Grazie per aver partecipato al PuccioQuiz!

Team PuccioQuiz
```

### 4. Ottieni le credenziali
Dal dashboard EmailJS prendi nota di:
- **Service ID** (dalla pagina Email Services)
- **Template ID** (dalla pagina Email Templates)  
- **Public Key** (da Account > API Keys)

### 5. Configura il progetto
Modifica il file `email-service.js` inserendo le tue credenziali:

```javascript
const EMAILJS_CONFIG = {
  serviceID: 'IL_TUO_SERVICE_ID',      // Sostituisci
  templateID: 'IL_TUO_TEMPLATE_ID',    // Sostituisci
  publicKey: 'LA_TUA_PUBLIC_KEY'       // Sostituisci
};
```

### 6. Testa il sistema
1. Apri la ruota del quiz
2. Vinci un premio
3. Controlla che l'email venga inviata
4. Verifica nella tua casella email

## 📋 Alternative Email Services

Se EmailJS non funziona, puoi usare:

### SendGrid (più professionale)
```javascript
// Esempio con SendGrid
async function sendEmailWithSendGrid(email, prize, token) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_SENDGRID_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: email }],
        subject: 'Complimenti! Hai vinto un premio!'
      }],
      from: { email: 'noreply@puccioquiz.it' },
      content: [{
        type: 'text/plain',
        value: `Hai vinto: ${prize}\nCodice: ${token}`
      }]
    })
  });
}
```

### Resend (moderno)
```javascript
// Esempio con Resend
import { Resend } from 'resend';
const resend = new Resend('YOUR_RESEND_API_KEY');

await resend.emails.send({
  from: 'noreply@puccioquiz.it',
  to: email,
  subject: 'Complimenti! Hai vinto un premio!',
  html: `<h1>Hai vinto: ${prize}</h1><p>Codice: ${token}</p>`
});
```

## ⚠️ Note importanti

- **EmailJS gratuito**: 200 email/mese
- **Dominio email**: Usa un dominio professionale per deliverability migliore
- **SPF/DKIM**: Configura record DNS per evitare spam
- **Test**: Semina test prima del lancio

## 🔧 Risoluzione problemi

### Email non arriva?
1. Controlla la cartella spam
2. Verifica le credenziali EmailJS
3. Controlla i log della console browser
4. Prova con un'altra email di test

### Errore API Key?
1. Verifica di aver copiato la Public Key correttamente
2. Ricontrolla Service ID e Template ID
3. Assicurati che il template sia attivo

### Limite email superato?
1. EmailJS free: 200 email/mese
2. Considera piano a pagamento o altro servizio
