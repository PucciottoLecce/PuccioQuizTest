// CONFIGURAZIONE BACKEND - SICURO PER GITHUB
// Le credenziali sono gestite tramite environment variables

// Configurazione Supabase
const SUPABASE_CONFIG = {
  URL: process.env.SUPABASE_URL || 'https://pluwvwjzhthfmpcjqexr.supabase.co',
  ANON_KEY: process.env.SUPABASE_ANON_KEY
};

// Configurazione Resend
const RESEND_CONFIG = {
  API_KEY: process.env.RESEND_API_KEY,
  FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'noreply@puccioquiz.it'
};

// Esporta le configurazioni per uso backend
module.exports = {
  SUPABASE_CONFIG,
  RESEND_CONFIG
};
