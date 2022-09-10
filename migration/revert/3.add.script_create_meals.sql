-- Revert ofood:3.add.script_create_meals from pg

BEGIN;
--DROP FUNCTION populate_meals;
COMMIT;
