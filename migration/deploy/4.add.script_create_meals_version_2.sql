-- Deploy ofood:4.add.script_create_meals_version_2 to pg

BEGIN;

--Fonction plus utilisée mais laissée ds le plan de déploiement pour exemple
-- (passage d'un objet Json en paramètre, puis retour d'une requête)

CREATE OR REPLACE FUNCTION populate_meals_v2(meals_v2 json) RETURNS TABLE( id INT,start_date_meals timestamptz, recipesOfUser json) AS $$


   DECLARE   
   --Déclaration des variables internes à la fonction.  
    userId INT;
    recipesId INT [];

    i INT;
    j INT;
    TEMP timestamptz;


    BEGIN

    TEMP      := meals_v2->>'start_date';
    userId    := meals_v2->>'users_id';
    recipesId := ARRAY(select regexp_split_to_table(replace(replace(meals_v2->>'recipes_id','[',''),']',''),','))::INT[];
	
    FOR i IN 1..21 LOOP
	
		raise notice 'TEMP: %', TEMP;

         INSERT INTO meals (start_date, users_id, recipes_id) 
                     VALUES( TEMP,userId ,recipesId[i]);

 
        j := j +1;

        IF (j=3) THEN 
        -- avt de sortir on ajoute 1 à la date du jour
         TEMP := TEMP + INTERVAL '1 DAYS';
         j := 0;

		END IF;

    END LOOP;


	RETURN QUERY
    SELECT users.id,meals.start_date, json_agg(recipes.*) AS user_recipes
     FROM "users"
     join meals on meals.users_id=users.id
     join recipes on recipes.id = meals.recipes_id
     where users.id = users_id
     GROUP BY users.id,meals.start_date ;


	END;
$$ LANGUAGE plpgsql;


 COMMIT;


--Pour test sous Pg Admin

-- SELECT populate_meals_v2('{
--   "start_date": "2022-05-10 06:56:30.513834+00",
--   "users_id": 1,
--   "recipes_id": [
--      74, 23, 66,  71, 85, 257,  65,
--     117, 91,  0, 373, 75,   0, 277,
--     104,  0, 10,  18,  0, 291,   0
--   ]}'::json);