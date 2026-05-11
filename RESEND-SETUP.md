# CONFIGURAZIONE RESEND PER INVIO EMAIL REALI

## 🚀 Guida completa per Resend da zero

### 1. Ottieni API Key Resend
1. Vai su [https://resend.com/](https://resend.com/)
2. Crea account o accedi
3. Vai a **API Keys** nel dashboard
4. Clicca **Create API Key**
5. Dai un nome (es: "PuccioQuiz")
6. Copia la API Key生成的

### 2. Configura dominio email
1. Vai a **Domains** nel dashboard
2. Clicca **Add Domain**
3. Inserisci il tuo dominio (es: `puccioquiz.it`)
4. Segui le istruzioni per configurare i record DNS:
   - **TXT record** per SPF
   - **CNAME record** per DKIM
   - **MX record** per ricezione email

### 3. Crea un template email
1. Vai a **Templates** nel dashboard
2. Clicca **Create Template**
3. Usa questo template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Complimenti! Hai vinto un premio!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #800020; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .prize { background: #fff; padding: 20px; border: 2px solid #800020; border-radius: 8px; margin: 20px 0; text-align: center; }
        .token { font-size: 24px; font-weight: bold; color: #800020; background: #fff3cd; padding: 15px; border-radius: 4px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Complimenti! Hai vinto!</h1>
            <h2>PuccioQuiz Premi</h2>
        </div>
        
        <div class="content">
            <p>Ciao {{to_email}},</p>
            
            <p>Sei stato selezionato come vincitore del nostro quiz!</p>
            
            <div class="prize">
                <h3>🏆 Il tuo premio:</h3>
                <h2 style="color: #800020;">{{prize_name}}</h2>
            </div>
            
            <div class="token">
                <strong>Il tuo codice premio unico:</strong><br>
                {{prize_token}}
            </div>
            
            <p><strong>Come ritirare il premio:</strong></p>
            <ul>
                <li>Presenta questo codice in negozio</li>
                <li>Il codice è valido per {{expiry_days}} giorni</li>
                <li>Può essere utilizzato una sola volta</li>
            </ul>
            
            <p>Per assistenza, contatta: <strong>{{contact_email}}</strong></p>
            
            <div class="footer">
                <p>Grazie per aver partecipato al PuccioQuiz!</p>
                <p>Team PuccioQuiz</p>
            </div>
        </div>
    </div>
</body>
</html>
```

4. Salva il template e prendi nota del **Template ID**

### 4. Modifica il servizio email
Modifica `email-service.js` per usare Resend:

```javascript
// Sostituisci la funzione sendRealPrizeEmail con questa versione Resend
async function sendRealPrizeEmail(email, prize, token) {
  console.log('DEBUG: Invio email Resend a:', email, 'premio:', prize, 'token:', token);
  
  try {
    const response = await fetch('https://api.resend.com/v1/emails', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer re_123456789', // Sostituisci con la tua API Key
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'noreply@puccioquiz.it', // Il tuo dominio verificato
        to: [email],
        subject: '🎉 Complimenti! Hai vinto un premio da PuccioQuiz!',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="utf-8">
              <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #800020; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
                  .prize { background: #fff; padding: 20px; border: 2px solid #800020; border-radius: 8px; margin: 20px 0; text-align: center; }
                  .token { font-size: 24px; font-weight: bold; color: #800020; background: #fff3cd; padding: 15px; border-radius: 4px; margin: 15px 0; }
              </style>
          </head>
          <body>
              <div class="container">
                  <div class="header">
                      <h1>🎉 Complimenti! Hai vinto!</h1>
                      <h2>PuccioQuiz Premi</h2>
                  </div>
                  
                  <div class="content">
                      <p>Ciao ${email},</p>
                      <p>Sei stato selezionato come vincitore del nostro quiz!</p>
                      
                      <div class="prize">
                          <h3>🏆 Il tuo premio:</h3>
                          <h2 style="color: #800020;">${prize}</h2>
                      </div>
                      
                      <div class="token">
                          <strong>Il tuo codice premio unico:</strong><br>
                          ${token}
                      </div>
                      
                      <p><strong>Come ritirare il premio:</strong></p>
                      <ul>
                          <li>Presenta questo codice in negozio</li>
                          <li>Il codice è valido per 7 giorni</li>
                          <li>Può essere utilizzato una sola volta</li>
                      </ul>
                      
                      <p>Per assistenza, contatta: <strong>info@puccioquiz.it</strong></p>
                  </div>
              </div>
          </body>
          </html>
        `
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('DEBUG: Email Resend inviata con successo!', data);
    
    // Salva nel database che l'email è stata inviata
    await saveEmailSentStatus(token);
    
    return { 
      success: true, 
      message: 'Email inviata con successo!',
      emailService: 'Resend',
      emailId: data.id
    };
    
  } catch (error) {
    console.error('DEBUG: Errore invio email Resend:', error);
    
    // Fallback a simulazione
    console.log('DEBUG: Resend fallito, uso simulazione come fallback');
    return await simulatePrizeEmail(email, prize, token);
  }
}
```

### 5. Testa il sistema
1. Sostituisci `re_123456789` con la tua vera API Key
2. Assicurati che il dominio sia verificato
3. Testa vincendo un premio alla ruota
4. Controlla la casella email e i log Resend

## 📋 Piani Resend

### Free Tier
- **3.000 email/mese**
- **1 dominio**
- **Email HTML**
- **Analytics**

### Pro ($20/mese)
- **50.000 email/mese**
- **3 domini**
- **Email priority**
- **Supporto prioritario**

## ⚠️ Note importanti

### Dominio email
- Devi verificare un dominio che possiedi
- Usa `noreply@tuodominio.it` come mittente
- Configura SPF, DKIM, e DMARC per deliverability

### Limiti
- Free tier: 3.000 email/mese
- Rate limit: 100 email/secondo
- Max attachment size: 40MB

### Debug
- Controlla i log nel dashboard Resend
- Usa la console del browser per debug JavaScript
- Verifica che l'API Key sia corretta

## 🔧 Risoluzione problemi

### "Invalid API key"
1. Verifica di aver copiato la API Key correttamente
2. Assicurati che non ci siano spazi extra
3. Controlla che la key sia attiva

### "Domain not verified"
1. Completa la verifica del dominio
2. Attendi la propagazione DNS (fino a 48 ore)
3. Controlla i record DNS con strumenti online

### "Rate limit exceeded"
1. Attendi prima di inviare altre email
2. Considera upgrade a piano Pro
3. Implementa batching per invii multipli

### Email non arriva
1. Controlla cartella spam
2. Verifica record DNS (SPF/DKIM)
3. Prova con indirizzi email diversi
