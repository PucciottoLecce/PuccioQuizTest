// SERVIZIO EMAIL REALE PER I VINCITORI
// Configurato con backend API per sicurezza

// Configura backend API (già configurata)
const API_CONFIG = {
  BASE_URL: 'https://api.puccioquiz.it', // URL base dell'API
  ENDPOINTS: {
    SEND_EMAIL: '/send-email' // Endpoint per invio email
  }
};

// Invia email reale al vincitore tramite backend
async function sendRealPrizeEmail(email, prize, token) {
  console.log('DEBUG: Invio email tramite backend a:', email, 'premio:', prize, 'token:', token);
  
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SEND_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        prize: prize,
        token: token
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('Email inviata con successo tramite backend:', data);
      return { success: true, simulated: false, data };
    } else {
      console.error('Errore invio email tramite backend:', data);
      return { success: false, simulated: false, error: data.error || 'Errore sconosciuto' };
    }
  } catch (error) {
    console.error('Errore chiamata backend email:', error);
    return { success: false, simulated: false, error };
  }
}

// Simula invio email (fallback)
async function simulatePrizeEmail(email, prize, token) {
  console.log('DEBUG: Simulo invio email premio a:', email, 'premio:', prize, 'token:', token);
  
  const emailContent = `
    Complimenti! Hai vinto: ${prize}
    
    Il tuo codice premio è: ${token}
    
    Per ritirare il premio:
    1. Presenta questo codice in negozio
    2. Il codice è valido per 7 giorni
    3. Può essere utilizzato una sola volta
    
    Email: ${email}
    Premio: ${prize}
    Token: ${token}
  `;
  
  console.log('DEBUG: === EMAIL SIMULATA INVIATA ===');
  console.log('A:', email);
  console.log('Oggetto: Complimenti! Hai vinto: ' + prize);
  console.log('Contenuto:', emailContent);
  console.log('=== FINE SIMULAZIONE ===');
  
  return { 
    success: true, 
    simulated: true,
    message: 'Email simulata (in attesa propagazione DNS Resend)'
  };
}

// Salva stato email inviata nel database
async function saveEmailSentStatus(token) {
  try {
    const client = initializeSupabase();
    
    // Aggiungi colonna email_sent se non esiste
    await client.rpc('add_email_sent_column_if_not_exists');
    
    // Aggiorna stato email
    const { data, error } = await client
      .from('wheel_spins')
      .update({ email_sent: true })
      .eq('prize_token', token);
      
    if (error) {
      console.error('Errore salvataggio stato email:', error);
    } else {
      console.log('Stato email salvato con successo');
    }
  } catch (error) {
    console.error('Errore salvataggio stato email:', error);
  }
}

// Funzione principale per inviare email
async function sendPrizeEmail(email, prize, token) {
  // Prima prova invio reale tramite backend
  try {
    const result = await sendRealPrizeEmail(email, prize, token);
    
    if (result.success) {
      await saveEmailSentStatus(token);
      return result;
    }
  } catch (error) {
    console.error('Errore invio email reale:', error);
  }
  
  // Fallback: simula invio
  console.log('DEBUG: Fallback a simulazione email');
  return await simulatePrizeEmail(email, prize, token);
}
