-- Revert ofood:5.add.script_create_meals_version_3 from pg

BEGIN;

DROP FUNCTION populate_meals_v3;

COMMIT;
