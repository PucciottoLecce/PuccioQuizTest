// Configurazione Supabase per PuccioQuiz System
// Sostituisce Google Apps Script con Supabase

// Configurazione Supabase - Le credenziali sono gestite dal backend
const SUPABASE_CONFIG = {
  URL: 'https://pluwvwjzhthfmpcjqexr.supabase.co',
  ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdXZ3d2p6aHRoZm1wY2pxZXhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMDc4MDAsImV4cCI6MjA0OTU4MzgwMH0.HTqdpCApO4Y1QbOO6XChDA_Q4RIIHl1'
};

// Endpoint API backend (sostituisci con il tuo URL di deploy)
const API_CONFIG = {
  BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'http://localhost:3000' 
    : 'https://pucciotestbackend.vercel.app', // Backend Vercel
  ENDPOINTS: {
    SAVE_WHEEL_RESULT: '/api/save-wheel-result',
    SEND_EMAIL: '/api/send-email',
    CHECK_ELIGIBILITY: '/api/check-eligibility'
  }
};

// Importa il client Supabase (dovrai includere lo script CDN nell'HTML)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

// Inizializza il client Supabase
let supabaseClient = null;

// Funzione per inizializzare Supabase
function initializeSupabase() {
  if (supabaseClient !== null) {
    return supabaseClient;
  }
  
  if (typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(SUPABASE_CONFIG.URL, SUPABASE_CONFIG.ANON_KEY);
    return supabaseClient;
  }
  
  console.error('Supabase non è caricato. Includi lo script CDN nell\'HTML.');
  return null;
}

// Funzione per ottenere l'IP dell'utente
async function getUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (e) {
    console.warn('Could not fetch IP:', e);
    return 'unknown';
  }
}

// Verifica se un utente può partecipare al quiz
async function checkEligibility(email) {
  console.log('DEBUG: Inizio checkEligibility per email:', email);
  
  try {
    const client = initializeSupabase();
    console.log('DEBUG: Client Supabase inizializzato:', !!client);
    
    if (!client) {
      console.error('DEBUG: Supabase client non inizializzato, uso fallback');
      // Fallback: permetti sempre per test
      return { eligible: true, alreadyTaken: false };
    }
    
    console.log('DEBUG: Tento query su quiz_participants...');
    
    // Controlla se l'email è già stata usata
    const { data: existingEmail, error: emailError } = await client
      .from('quiz_participants')
      .select('email')
      .eq('email', email)
      .single();
    
    console.log('DEBUG: Risultato query:', { existingEmail, emailError });
    
    if (emailError) {
      console.error('DEBUG: Errore query database:', emailError);
      // Se la tabella non esiste, permetti per test
      if (emailError.code === 'PGRST116') {
        console.log('DEBUG: Tabella non esiste, uso fallback');
        return { eligible: true, alreadyTaken: false };
      }
      throw emailError;
    }
    
    if (existingEmail) {
      console.log('DEBUG: Email già utilizzata');
      return { eligible: false, alreadyTaken: true, reason: 'email_exists' };
    }
    
    console.log('DEBUG: Email libera, eleggibile');
    return { eligible: true, alreadyTaken: false };
  } catch (e) {
    console.error('DEBUG: Errore completo in checkEligibility:', e);
    // Fallback per permettere il test
    console.log('DEBUG: Uso fallback a causa di errore');
    return { eligible: true, alreadyTaken: false };
  }
}

// Salva il risultato del quiz
async function saveQuizResult(data) {
  console.log('DEBUG: Inizio saveQuizResult con dati:', data);
  
  try {
    const client = initializeSupabase();
    console.log('DEBUG: Client Supabase inizializzato per salvataggio:', !!client);
    
    if (!client) {
      console.error('DEBUG: Supabase client non inizializzato per salvataggio, uso fallback');
      return { success: true };
    }
    
    const { email, score, answers, q10, gdprAccepted, timestamp } = data;
    
    console.log('DEBUG: Tento inserimento in quiz_participants...');
    
    const { error } = await client
      .from('quiz_participants')
      .insert({
        email: obfuscateEmail(email), // Email oscurata
        score,
        answers: JSON.stringify(answers),
        q10_answers: JSON.stringify(q10),
        gdpr_accepted: gdprAccepted,
        created_at: timestamp || new Date().toISOString(),
        ip_address: await getUserIP()
      });
    
    console.log('DEBUG: Risultato inserimento:', { error });
    
    if (error) {
      console.error('DEBUG: Errore inserimento database:', error);
      // Se la tabella non esiste, usa fallback
      if (error.code === 'PGRST116') {
        console.log('DEBUG: Tabella non esiste per salvataggio, uso fallback');
        return { success: true };
      }
      throw error;
    }
    
    console.log('DEBUG: Salvataggio completato con successo');
    return { success: true };
  } catch (e) {
    console.error('DEBUG: Errore completo in saveQuizResult:', e);
    // Fallback per permettere il test
    console.log('DEBUG: Uso fallback salvataggio a causa di errore');
    return { success: true };
  }
}

// Verifica se un utente può usare la ruota
async function checkWheelEligibility(email, ip) {
  try {
    const client = initializeSupabase();
    if (!client) throw new Error('Supabase non inizializzato');
    
    // Controlla se l'email ha già usato la ruota
    const { data: emailUsed, error: emailError } = await client
      .from('wheel_spins2')
      .select('email')
      .eq('email', email)
      .single();
    
    if (emailUsed) {
      return { wheelAlreadyUsed: true, reason: 'same_email' };
    }
    
    // Controlla se l'IP ha già usato la ruota
    const { data: ipUsed, error: ipError } = await client
      .from('wheel_spins2')
      .select('ip_address')
      .eq('ip_address', ip)
      .single();
    
    if (ipUsed) {
      return { wheelAlreadyUsed: true, reason: 'same_ip' };
    }
    
    return { wheelAlreadyUsed: false };
  } catch (e) {
    console.error('Errore nella verifica della ruota:', e);
    return { error: true, message: e.message };
  }
}

// Funzione per oscurare l'email (base64)
function obfuscateEmail(email) {
  try {
    return btoa(email);
  } catch (e) {
    console.warn('Errore nell\'oscuramento email:', e);
    return email; // fallback in caso di errore
  }
}

// Funzione per oscurare il token (hash)
function obfuscateToken(token) {
  try {
    // Simulazione hash per oscurare il token
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
      const char = token.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  } catch (e) {
    console.warn('Errore nell\'oscuramento token:', e);
    return token; // fallback in caso di errore
  }
}

// Genera un token unico per il premio
function generatePrizeToken() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `TOKEN-${timestamp}-${randomStr}`.toUpperCase();
}

// Salva il risultato della ruota nel database tramite backend
async function saveWheelResult(email, prize, spinResult) {
  console.log('DEBUG: Salvataggio ruota tramite backend:', { email, prize, spinResult });
  try {
    const prizeToken = generatePrizeToken();
    const userIP = await getUserIP();
    const timestamp = new Date().toISOString();

    console.log('DEBUG: Tentativo salvataggio con token:', prizeToken);

    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SAVE_WHEEL_RESULT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        prize: prize,
        prize_token: prizeToken,
        spin_result: spinResult,
        ip_address: userIP,
        created_at: timestamp
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('DEBUG: Salvataggio completato con successo tramite backend:', data);
      return { 
        success: true, 
        token: prizeToken,
        data: data.data 
      };
    } else {
      console.error('DEBUG: Errore salvataggio backend:', data);
      return { 
        success: false, 
        error: data.error || 'Errore sconosciuto' 
      };
    }
  } catch (error) {
    console.error('DEBUG: Errore generale salvataggio ruota:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
}

// Salva l'email quando l'utente sbaglia il quiz
async function saveQuizFailure(email, correctAnswers, totalQuestions) {
  console.log('DEBUG: Inizio saveQuizFailure per email:', email, 'corrette:', correctAnswers);
  
  try {
    const client = initializeSupabase();
    const userIP = await getUserIP();
    
    // Dati da inserire nella tabella quiz_failures
    const insertData = {
      email: email,
      correct_answers: correctAnswers,
      total_questions: totalQuestions,
      ip_address: userIP,
      created_at: new Date().toISOString()
    };
    
    console.log('DEBUG: Dati quiz failure da inserire:', insertData);
    
    const { data, error } = await client
      .from('quiz_failures')
      .insert([insertData]);
    
    if (error) {
      console.error('DEBUG: Errore salvataggio quiz failure:', error);
      return { success: false, error: error.message };
    }
    
    console.log('DEBUG: Quiz failure salvato con successo');
    return { success: true, data: data };
    
  } catch (e) {
    console.error('DEBUG: Eccezione salvataggio quiz failure:', e);
    return { success: false, error: e.message };
  }
}

// Verifica se un'email ha già vinto un premio
async function checkEmailPrize(email) {
  console.log('DEBUG: Verifico premi esistenti per email:', email);
  
  try {
    const client = initializeSupabase();
    
    const { data, error } = await client
      .from('wheel_spins')
      .select('prize, created_at')
      .eq('email', email)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('DEBUG: Errore verifica premi:', error);
      return { success: false, error: error.message };
    }
    
    console.log('DEBUG: Premi trovati:', data);
    return { success: true, prizes: data || [] };
    
  } catch (e) {
    console.error('DEBUG: Eccezione verifica premi:', e);
    return { success: false, error: e.message };
  }
}

// Simula invio email con token (da implementare con servizio email reale)
async function sendPrizeEmail(email, prize, token) {
  console.log('DEBUG: Simulo invio email premio a:', email, 'premio:', prize, 'token:', token);
  
  // TODO: Implementare con servizio email reale (SendGrid, EmailJS, etc.)
  // Per ora simuliamo l'invio
  
  const emailContent = `
    Complimenti! Hai vinto: ${prize}
    
    Il tuo codice premio unico è: ${token}
    
    Presenta questo codice in negozio per ritirare il tuo premio.
    
    Il codice è valido per 7 giorni e può essere utilizzato una sola volta.
  `;
  
  console.log('DEBUG: Email da inviare:', emailContent);
  console.log('DEBUG: === EMAIL SIMULATA INVIATA ===');
  console.log('A:', email);
  console.log('Oggetto: Complimenti! Hai vinto: ' + prize);
  console.log('Contenuto:', emailContent);
  console.log('=== FINE SIMULAZIONE ===');
  
  // NOTA: Non aggiorniamo database perché le colonne token_* non esistono più
  // In produzione con un servizio email reale, qui potremmo tracciare l'invio
  
  console.log('DEBUG: Simulazione email completata con successo');
  return { success: true, simulated: true };
}

// Esporta le funzioni per compatibilità
window.SupabaseAPI = {
  checkEligibility,
  saveQuizResult,
  checkWheelEligibility,
  saveWheelResult,
  checkEmailPrize,
  sendPrizeEmail,
  generatePrizeToken,
  saveQuizFailure,
  initializeSupabase
};
