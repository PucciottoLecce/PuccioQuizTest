-- SCRIPT PER ATTIVARE/DISATTIVARE RLS SU RICHIESTA
-- Esegui questo script quando vuoi cambiare lo stato RLS

-- PER DISABILITARE RLS (consigliato per test)
ALTER TABLE wheel_spins DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_failures DISABLE ROW LEVEL SECURITY;

-- PER ABILITARE RLS (consigliato per produzione)
-- ALTER TABLE wheel_spins ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE quiz_failures ENABLE ROW LEVEL SECURITY;

-- VERIFICA STATO RLS ATTUALE
SELECT 
    schemaname,
    tablename,
    rowlevelsecurity,
    forcerlspolicy
FROM pg_tables 
WHERE tablename IN ('wheel_spins', 'quiz_failures')
ORDER BY tablename;

-- MESSAGGIO
SELECT 'RLS status updated. Check rowlevelsecurity column: true = enabled, false = disabled' as status;
