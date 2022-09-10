--pour test 
-- SELECT * FROM populate_meals('{"start_date":"2022-05-10 06:56:30.513834+00",
-- "users_id":1, "recipes_id":1}');

-- Récup du régime spécifique d'un utilisateur.
-- Jointure ok sélection à faire
SELECT * FROM public.users
join users_choose_specific_diet on users_choose_specific_diet.users_id = users.id
join specific_diet on users_choose_specific_diet.id =specific_diet.id
where users.id = 1;

--Restriction fields
SELECT users.id, users.email, users.firstname, users.lastname,specific_diet.id, specific_diet.name FROM public.users
join users_choose_specific_diet on users_choose_specific_diet.users_id = users.id
join specific_diet on users_choose_specific_diet.id =specific_diet.id
where users.id = 1;


-- Récup des repas d'un utilisateur.
SELECT * FROM public.users
join meals on meals.users_id=users.id
join recipes on recipes.id=meals.recipes_id
where users.id = 1;



--Restriction fields
SELECT users.id,meals.start_date,recipes.id,recipes.name,recipes.photo_link,recipes.meal_time,
recipes.max_imc,recipes.type,recipes.steps_desc,recipes.ingredient_desc
FROM public.users
join meals on meals.users_id=users.id
join recipes on recipes.id=meals.recipes_id
where users.id = 1;


-- --Methode 1 Déclaration 1 ok
--  CREATE OR REPLACE FUNCTION get_fields_demo() RETURNS recipes AS
-- $$
-- SELECT * FROM recipes;
-- $$ LANGUAGE sql ;


-- --Apelle fct ok
-- SELECT * FROM get_fields_demo();


{
    "name":"Cabillaud petits pois& lard",
    "photo_link":"imgRecette_37",
    "meal_time":13,
    "max_imc":35,
    "type":2,
    "steps_desc":"<ol><li>Etape 1 : Dans une casserole d''eau bouillante salée, faites cuire les petits pois pendant 8 minutes.Etape 2 : Pendant ce temps, dans une poêle, ajoutez les tranches de lard et le cabillaud.Etape 3 :Retirez le lard de la poêle une fois qu''il est bien doré.Etape 4 : Faites cuire le cabillaud 4 minutes de chaque côté. Ajoutez un filet d''huile d''olive si besoin.Etape 5 : Une fois la cuisson des petits pois terminée égouttez-les puis assaisonnez-les: sel, poivre, jus de citron, fin filet d''huile d''olive,mélangez. Etape 6 : Servez-les avec le poisson et le lard une fois leur cuisson terminée.Etape 7 : Râpez le zeste du citron sur le dessus, salez, poivrez, ajoutez un fin filet d''huile d''olive, c''est prêt !  </li></ol>'",
    "ingredient_desc":"<ul><li>1 cabillaud (frais), 200 g Petits pois (frais), 1 tran. Lard ,1/4 citron jaune.</li></ul>"
    
}






// FCT OK
DECLARE   
    i INT;
    j INT;
    TEMP timestamptz := meals_start_date;

    BEGIN

    FOR i IN 1..7 LOOP

        FOR j IN 1..3 LOOP

        INSERT INTO meals (start_date, users_id, recipes_id) 
                    VALUES( TEMP,meals_users_id ,meals_recipesId[(i*j)] );

         END LOOP;

        -- avt de sortir on ajoute 1 à la date du jour
         TEMP := TEMP + INTERVAL '1 DAYS';
		 
    END LOOP;

	RETURN QUERY
    SELECT users.id,meals.start_date, json_agg(recipes.*) AS user_recipes
     FROM "users"
     join meals on meals.users_id=users.id
     join recipes on recipes.id = meals.recipes_id
     where users.id = meals_users_id
     GROUP BY users.id,meals.start_date ;

	END;
$$ LANGUAGE plpgsql;




          // pour controle
          // recipes_temp[1] = recipes_type_2_for_user[0].id;
          // recipes_temp[2] = recipes_type_2_for_user[1].id;

          // recipes_temp[4] = recipes_type_2_for_user[2].id;
          // recipes_temp[5] = recipes_type_2_for_user[3].id;

          // recipes_temp[7] = recipes_type_2_for_user[4].id;
          // recipes_temp[8] = recipes_type_2_for_user[5].id;

          // recipes_temp[10] = recipes_type_2_for_user[6].id;
          // recipes_temp[11] = recipes_type_2_for_user[7].id;

          // recipes_temp[13] = recipes_type_2_for_user[8].id;
          // recipes_temp[14] = recipes_type_2_for_user[9].id;

          // recipes_temp[16] = recipes_type_2_for_user[10].id;
          // recipes_temp[17] = recipes_type_2_for_user[11].id;

          // recipes_temp[19] = recipes_type_2_for_user[12].id;





          // récup fichier de seeding


--*1




            -- INSERT INTO public.meals(
-- 	id, start_date, users_id, recipes_id, "createdAt", "updatedAt")
-- 	VALUES  (1, '2022-05-09', 1, 0,'2022-05-05', '2022-05-05'),
-- 			(2, '2022-05-09',1, 0, '2022-05-05', '2022-05-05'),
-- 			(3, '2022-05-09', 1,0, '20022-05-05', '20022-05-05'),
-- 			(4, '2022-05-17', 1, 0, '2022-05-17', '2022-05-17'),
-- 			(5, '2022-05-17', 1, 0, '2022-05-17', '2022-05-17'), --5
-- 			(6, '2022-05-17', 1, 0, '2022-05-17','2022-05-17'),
-- 			(7, '2022-05-25',1, 0, '2022-05-25','2022-05-25'),
-- 			(8, '2022-05-25',1, 0,'2022-05-25' ,'2022-05-25' ),
-- 			(9, '2022-05-25', 1, 0, '2022-05-25', '2022-05-25'),
-- 			(10, '2022-06-03',1, 0, '2022-06-03', '2022-06-03'), --10
-- 			(11, '2022-06-03', 1, 0, '2022-06-03', '2022-06-03'),
-- 			(12, '2022-06-03', 1, 0, '2022-06-03', '2022-06-03'),
-- 			(13, '2022-06-11', 1, 0, '2022-06-11', '2022-06-11'),
-- 			(14, '2022-06-11', 1, 0, '2022-06-11', '2022-06-11'),
-- 			(15, '2022-06-11', 1, 0, '2022-06-11', '2022-06-11'), --15
-- 			(16, '2022-09-20', 1, 0, '2022-09-20', '2022-09-20'),
-- 			(17, '2022-09-20', 1, 0, '2022-09-20', '2022-09-20'),
-- 			(18, '2022-09-20', 1, 0, '2022-09-01', '2022-09-20'),
-- 			(19, '2022-09-01', 1, 0, '2022-09-01', '2022-09-01'),
-- 			(20, '2022-09-01', 1, 0, '2022-09-01', '2022-09-01'),--20 
-- 			(21, '2022-09-01', 1, 0, '2022-09-01', '2022-09-01');





--*2

//sauvegarde fct


BEGIN;


 COMMIT;

--  SELECT populate_meals_v3('2022-05-10 06:56:30.513834+00',1, ARRAY[65,277,23,74,373,117,71,257,75,0,85,18,0,91,66,0,10,104,0,291,0]);




///fction pacth
CREATE OR REPLACE FUNCTION populate_meals_v3(
    meals_start_date timestamptz,
    meals_users_id INT,
    meals_recipesId INT[]) RETURNS void AS $$


   DECLARE   
   
    i INT;
    j INT:=0;

    TEMP timestamptz := meals_start_date;

    BEGIN


    FOR i IN 1..21 LOOP

        raise notice 'Value de i: %', i;
		raise notice 'meals_recipesId: %', meals_recipesId;
		raise notice 'meals_recipesId[1]: %', meals_recipesId[1];

         INSERT INTO meals (start_date, users_id, recipes_id) 
                     VALUES( TEMP,meals_users_id ,meals_recipesId[i]);

 
        j := j +1;

        IF (j=3) THEN 

         TEMP := TEMP + INTERVAL '1 DAYS';
         j := 0;

		END IF;

    END LOOP;


	

	END
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION recipesBy_IntolerancesAnd_Imc(usersId INT, typeRecipes INT) RETURNS TABLE( uId INT, recsId INT) AS $$
   
   DECLARE   
   
    BEGIN

	IF NOT EXISTS (SELECT * FROM "users_choose_specific_diet" WHERE users_choose_specific_diet.users_id = usersId) THEN

	  -- RAISE EXCEPTION 'Pas d intolerance pour le user ID : % ', usersId;
	  RETURN QUERY 
	  SELECT usersId, recipes.id FROM "recipes"
	   WHERE type=typeRecipes
	   ORDER BY RANDOM() LIMIT 21;
	   
	END IF;

	RETURN QUERY
	SELECT
	users.id,
	recipes.id
	FROM public.users
	join users_choose_specific_diet on users_choose_specific_diet.users_id=users.id
	join specific_diet on specific_diet.id=users_choose_specific_diet.specific_diet_id
	join specific_diet_has_recipes on specific_diet_has_recipes.specific_diet_id=specific_diet.id
	join recipes on recipes.id = specific_diet_has_recipes.recipes_id
	where users.id = usersId and users.imc<=recipes.max_imc and recipes.type =typeRecipes
	ORDER BY RANDOM() LIMIT 21;

	END
$$ LANGUAGE plpgsql;





-- premier parm le user 2eme le type de la recette
--SELECT recipesBy_IntolerancesAnd_Imc(1,1);


V2 DE LA FCT

CREATE OR REPLACE FUNCTION recipesBy_IntolerancesAnd_Imc(usersId INT, typeRecipes INT) RETURNS TABLE( uId INT, recsId INT) AS $$
   
   DECLARE   
   	
	userImc INT;
   	
    BEGIN

	IF NOT EXISTS (SELECT * FROM "users_choose_specific_diet" WHERE users_choose_specific_diet.users_id = usersId) THEN

	  -- RAISE EXCEPTION 'Pas d intolerance pour le user ID : % ', usersId;
	  
	  SELECT users.imc INTO userImc FROM "users" WHERE users.id = usersId;
	  
	  RETURN QUERY 
	  SELECT usersId, recipes.id FROM "recipes"
	  WHERE type=typeRecipes and recipes.max_imc>=userImc
	  ORDER BY RANDOM() LIMIT 21;
	   
	END IF;

	RETURN QUERY
	SELECT
	users.id,
	recipes.id
	FROM public.users
	join users_choose_specific_diet on users_choose_specific_diet.users_id=users.id
	join specific_diet on specific_diet.id=users_choose_specific_diet.specific_diet_id
	join specific_diet_has_recipes on specific_diet_has_recipes.specific_diet_id=specific_diet.id
	join recipes on recipes.id = specific_diet_has_recipes.recipes_id
	where users.id = usersId and users.imc<=recipes.max_imc and recipes.type =typeRecipes
	ORDER BY RANDOM() LIMIT 21;

	END
$$ LANGUAGE plpgsql;

SELECT recipesBy_IntolerancesAnd_Imc(1,0);


--V3 DE LA FCT on a pas besoin de l'id du user dans le retour


CREATE OR REPLACE FUNCTION recipesBy_IntolerancesAnd_Imc(usersId INT, typeRecipes INT) RETURNS TABLE( id INT) AS $$

   DECLARE   
   	
	userImc INT;
   	
    BEGIN

	IF NOT EXISTS (SELECT * FROM "users_choose_specific_diet" WHERE users_choose_specific_diet.users_id = usersId) THEN

	  -- RAISE EXCEPTION 'Pas d intolerance pour le user ID : % ', usersId;
	  
	  SELECT users.imc INTO userImc FROM "users" WHERE users.id = usersId;
	  
	  RETURN QUERY 
	  SELECT usersId, recipes.id FROM "recipes"
	  WHERE type=typeRecipes and recipes.max_imc>=userImc
	  ORDER BY RANDOM() LIMIT 21;
	   
	END IF;

	RETURN QUERY
	SELECT
	--users.id,
	recipes.id
	FROM public.users
	join users_choose_specific_diet on users_choose_specific_diet.users_id=users.id
	join specific_diet on specific_diet.id=users_choose_specific_diet.specific_diet_id
	join specific_diet_has_recipes on specific_diet_has_recipes.specific_diet_id=specific_diet.id
	join recipes on recipes.id = specific_diet_has_recipes.recipes_id
	where users.id = usersId and users.imc<=recipes.max_imc and recipes.type =typeRecipes
	ORDER BY RANDOM() LIMIT 21;

	END
$$ LANGUAGE plpgsql;