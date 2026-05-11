// Configuration for PuccioQuiz System
// Ora usa Supabase invece di Google Apps Script

const API_CONFIG = {
  CHECK_ELIGIBILITY: 'checkEligibility',
  SAVE_QUIZ: 'saveQuiz',
  SAVE_WHEEL_RESULT: 'saveWheelResult',
  GET_USER_DATA: 'getUserData'
};

// Helper function to get user's IP (via ipify)
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

// Backend call wrapper per compatibilità con il codice esistente
async function callBackend(action, data = {}) {
  try {
    // Usa le funzioni Supabase se disponibili
    if (window.SupabaseAPI) {
      switch (action) {
        case 'checkEligibility':
          return await window.SupabaseAPI.checkEligibility(data.email);
        
        case 'saveQuiz':
          return await window.SupabaseAPI.saveQuizResult(data);
        
        case 'saveWheelResult':
          if (data.action === 'checkWheelEligibility') {
            return await window.SupabaseAPI.checkWheelEligibility(data.email, data.ip);
          } else {
            return await window.SupabaseAPI.saveWheelResult(data.email, data.ip, data.prize, data.token, data.timestamp);
          }
        
        default:
          return { error: 'Azione non supportata' };
      }
    }
    
    // Fallback a Google Apps Script se Supabase non è disponibile
    console.warn('Supabase non disponibile, usando fallback');
    return { error: 'Backend non configurato correttamente' };
    
  } catch (e) {
    console.error('Backend call failed:', e);
    return { error: 'Impossibile contattare il server: ' + e.message };
  }
}

