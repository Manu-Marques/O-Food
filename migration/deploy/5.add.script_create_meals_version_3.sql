-- Deploy ofood:5.add.script_create_meals_version_3 to pg

BEGIN;

CREATE OR REPLACE FUNCTION populate_meals_v3(
    meals_start_date timestamptz,
    meals_users_id INT,
    meals_recipesId INT[]) RETURNS TABLE( id INT,start_date timestamptz, recipesOfUser json) AS $$
   
    -- start_date:'2022-05-10 06:56:30.513834+00',

   DECLARE   
   
    i INT;
    j INT:=0;

    TEMP timestamptz := meals_start_date;
    --TEMP2 INT[]:=array[65,277,23,74,373,117,71,257,75,0,85,18,0,91,66,0,10,104,0,291,0]

    BEGIN


    FOR i IN 1..21 LOOP

        raise notice 'Value de i: %', i;
		raise notice 'meals_recipesId: %', meals_recipesId;
		raise notice 'meals_recipesId[1]: %', meals_recipesId[1];

         INSERT INTO meals (start_date, users_id, recipes_id) 
                     VALUES( TEMP,meals_users_id ,meals_recipesId[i]);

 
        j := j +1;

        IF (j=3) THEN 
        -- avt de sortir on ajoute 1 à la date du jour
         TEMP := TEMP + INTERVAL '1 DAYS';
         j := 0;

		END IF;

    END LOOP;


	RETURN QUERY
    SELECT users.id,meals.start_date, json_agg(recipes.*) AS recipesOfUser
     FROM "users"
     join meals on meals.users_id=users.id
     join recipes on recipes.id = meals.recipes_id
     where users.id = meals_users_id
     GROUP BY users.id,meals.start_date;

	END
$$ LANGUAGE plpgsql;

 COMMIT;

--Pour test sous Pg Admin
--  SELECT populate_meals_v3('2022-05-10 06:56:30.513834+00',1, ARRAY[65,277,23,74,373,117,71,257,75,0,85,18,0,91,66,0,10,104,0,291,0]);