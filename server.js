// SERVER BACKEND PER GESTIONE API SENSIBILI
// Questo server gestisce le chiamate API con credenziali private
// Non esporre mai questo file lato client

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { SUPABASE_CONFIG, RESEND_CONFIG } = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Inizializza Supabase
const supabase = createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);

// Endpoint per salvare risultati della ruota
app.post('/api/save-wheel-result', async (req, res) => {
  try {
    const { email, prize, prize_token, spin_result, ip_address } = req.body;
    
    const { data, error } = await supabase
      .from('wheel_spins')
      .insert([
        {
          email,
          prize,
          prize_token,
          spin_result,
          ip_address,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Errore salvataggio:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Errore server:', error);
    res.status(500).json({ success: false, error: 'Errore interno del server' });
  }
});

// Endpoint per inviare email
app.post('/api/send-email', async (req, res) => {
  try {
    const { email, prize, token } = req.body;
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_CONFIG.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: RESEND_CONFIG.FROM_EMAIL,
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
                .token { font-size: 28px; font-weight: bold; color: #800020; background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border: 3px solid #800020; text-align: center; }
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
                        <strong>🎫 IL TUO CODICE PREMIO UNICO:</strong><br><br>
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

    const data = await response.json();

    if (response.ok) {
      console.log('Email inviata con successo:', data);
      res.json({ success: true, data });
    } else {
      console.error('Errore invio email:', data);
      res.status(500).json({ success: false, error: data });
    }
  } catch (error) {
    console.error('Errore server email:', error);
    res.status(500).json({ success: false, error: 'Errore interno del server' });
  }
});

// Endpoint per check eleggibilità
app.post('/api/check-eligibility', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Controlla se l'email ha già vinto
    const { data: existingWins } = await supabase
      .from('wheel_spins')
      .select('*')
      .eq('email', email);

    if (existingWins && existingWins.length > 0) {
      return res.json({ 
        eligible: false, 
        reason: 'Email già utilizzata per una vincita' 
      });
    }

    res.json({ eligible: true });
  } catch (error) {
    console.error('Errore check eleggibilità:', error);
    res.status(500).json({ success: false, error: 'Errore interno del server' });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server backend avviato su porta ${PORT}`);
  console.log('API endpoints disponibili:');
  console.log('- POST /api/save-wheel-result');
  console.log('- POST /api/send-email');
  console.log('- POST /api/check-eligibility');
});
