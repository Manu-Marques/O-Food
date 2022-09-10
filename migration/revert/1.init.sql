-- Revert ofood:1.init from pg

BEGIN;

ALTER SCHEMA "public" OWNER TO "ofood";

DROP TABLE "users","meals","recipes","users_create_recipes","specific_diet","specific_diet_has_recipes","users_choose_specific_diet" CASCADE ;

COMMIT;
