-- Script per aggiornare la tabella wheel_spins2 con le colonne anti-frode
-- Esegui questo script nel tuo database Supabase

-- Aggiungi le nuove colonne per il sistema anti-frode
ALTER TABLE wheel_spins2 
ADD COLUMN IF NOT EXISTS prize_token TEXT,
ADD COLUMN IF NOT EXISTS token_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS token_sent_at TIMESTAMP;

-- Aggiungi indici per performance
CREATE INDEX IF NOT EXISTS idx_wheel_spins2_email_prize ON wheel_spins2(email, prize);
CREATE INDEX IF NOT EXISTS idx_wheel_spins2_token ON wheel_spins2(prize_token);

-- Aggiungi constraint per garantire token unici (PostgreSQL syntax)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'unique_prize_token' 
        AND conrelid = 'wheel_spins2'::regclass
    ) THEN
        ALTER TABLE wheel_spins2 
        ADD CONSTRAINT unique_prize_token 
        UNIQUE (prize_token);
    END IF;
END $$;

-- Query per verificare la struttura della tabella
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'wheel_spins2' 
ORDER BY ordinal_position;
