-- Fix RLS Policies per PuccioQuiz
-- Esegui questi comandi nel dashboard Supabase -> SQL Editor

-- 1. Abilita RLS sulle tabelle se non è già attivo
ALTER TABLE quiz_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE wheel_spins ENABLE ROW LEVEL SECURITY;

-- 2. Rimuovi policy esistenti (se presenti)
DROP POLICY IF EXISTS "Users can view their own quiz_participants" ON quiz_participants;
DROP POLICY IF EXISTS "Users can insert quiz_participants" ON quiz_participants;
DROP POLICY IF EXISTS "Users can view their own wheel_spins" ON wheel_spins;
DROP POLICY IF EXISTS "Users can insert wheel_spins" ON wheel_spins;

-- 3. Crea policy permissive per permettere tutte le operazioni (per testing)
CREATE POLICY "Enable insert for all users" ON quiz_participants
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable select for all users" ON quiz_participants
    FOR SELECT USING (true);

CREATE POLICY "Enable update for all users" ON quiz_participants
    FOR UPDATE USING (true);

CREATE POLICY "Enable insert for all users" ON wheel_spins
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable select for all users" ON wheel_spins
    FOR SELECT USING (true);

CREATE POLICY "Enable update for all users" ON wheel_spins
    FOR UPDATE USING (true);

-- 4. Verifica le tabelle esistano
SELECT table_name, table_type 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('quiz_participants', 'wheel_spins');

-- 5. Mostra le policy attuali
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('quiz_participants', 'wheel_spins');
