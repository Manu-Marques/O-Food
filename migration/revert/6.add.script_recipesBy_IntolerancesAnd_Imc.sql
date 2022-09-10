-- Revert ofood:6.add.script_fct_intolerance from pg

BEGIN;

DROP FUNCTION recipesBy_IntolerancesAnd_Imc;

COMMIT;
