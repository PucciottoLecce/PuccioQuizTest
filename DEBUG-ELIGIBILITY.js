// DEBUG SCRIPT - Test controllo partecipazione
// Includi questo script in index.html per debug

console.log('=== DEBUG CONTROLLO PARTECIPAZIONE ===');

// Funzione di test diretto al backend
async function testBackendDirect() {
  console.log('🔍 Test diretto backend...');
  
  try {
    const response = await fetch('https://puccio-quiz-win-21.vercel.app/api/check-eligibility', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', [...response.headers.entries()]);
    
    const data = await response.json();
    console.log('📡 Response data:', data);
    
    return data;
  } catch (error) {
    console.error('❌ Errore test backend:', error);
    return { error: error.message };
  }
}

// Funzione per testare Supabase diretto
async function testSupabaseDirect() {
  console.log('🔍 Test Supabase diretto...');
  
  try {
    const { data, error } = await supabase
      .from('quiz_participants')
      .select('email')
      .eq('test@example.com')
      .single();
    
    console.log('📡 Supabase data:', data);
    console.log('📡 Supabase error:', error);
    
    return { data, error };
  } catch (error) {
    console.error('❌ Errore Supabase:', error);
    return { error: error.message };
  }
}

// Test automatico al caricamento
window.addEventListener('load', async () => {
  console.log('🚀 Inizio test automatico...');
  
  // Test 1: Backend diretto
  const backendResult = await testBackendDirect();
  
  // Test 2: Supabase diretto
  const supabaseResult = await testSupabaseDirect();
  
  console.log('=== RIEPILOGO TEST ===');
  console.log('Backend:', backendResult);
  console.log('Supabase:', supabaseResult);
});

// Funzione per testare il controllo partecipazione esistente
window.testEligibilityDebug = async function(email) {
  console.log('🔍 Test controllo partecipazione per:', email);
  
  try {
    // Simula la chiamata esattamente come fa index.html
    const eligibility = await callBackend(API_CONFIG.CHECK_ELIGIBILITY, { email });
    console.log('📡 Risultato controllo:', eligibility);
    
    return eligibility;
  } catch (e) {
    console.error('❌ Errore controllo:', e);
    return { eligible: false, error: true, message: e.message };
  }
};

console.log('📋 Script debug caricato. Usa testEligibilityDebug("tua@email.com") per testare.');
