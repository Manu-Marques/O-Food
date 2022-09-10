-- Revert ofood:4.add.script_create_meals_version_2 from pg

BEGIN;

DROP FUNCTION populate_meals_v2;

COMMIT;
