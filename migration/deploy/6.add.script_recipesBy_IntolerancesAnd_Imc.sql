-- Deploy ofood:6.add.script_fct_intolerance to pg

BEGIN;

CREATE OR REPLACE FUNCTION recipesBy_IntolerancesAnd_Imc(usersId INT, typeRecipes INT) RETURNS TABLE( id INT) AS $$

   DECLARE   
   	
	userImc INT;
   	
    BEGIN

	IF NOT EXISTS (SELECT * FROM "users_choose_specific_diet" WHERE users_choose_specific_diet.users_id = usersId) THEN

	  -- RAISE EXCEPTION 'Pas d intolerance pour le user ID : % ', usersId;
	  
	  SELECT users.imc INTO userImc FROM "users" WHERE users.id = usersId;
	  
	  RETURN QUERY 
	  SELECT 
	 -- usersId, 
	  recipes.id FROM "recipes"
	  WHERE type=typeRecipes and recipes.max_imc>=userImc
	  ORDER BY RANDOM() LIMIT 21;
	   
	END IF;


IF(typeRecipes = 0) THEN

	-- RETURN QUERY
	-- SELECT
	-- --users.id,
	-- recipes.id
	-- FROM public.users
	-- join users_choose_specific_diet on users_choose_specific_diet.users_id=users.id
	-- join specific_diet on specific_diet.id=users_choose_specific_diet.specific_diet_id
	-- join specific_diet_has_recipes on specific_diet_has_recipes.specific_diet_id=specific_diet.id
	-- join recipes on recipes.id = specific_diet_has_recipes.recipes_id
	-- where users.id = usersId and users.imc<=recipes.max_imc and recipes.type = typeRecipes
	-- ORDER BY RANDOM() LIMIT 21;

	RETURN QUERY
	SELECT * FROM (SELECT
	--users.id,
	DISTINCT recipes.id
	FROM public.users
	join users_choose_specific_diet on users_choose_specific_diet.users_id=users.id
	join specific_diet on specific_diet.id=users_choose_specific_diet.specific_diet_id
	join specific_diet_has_recipes on specific_diet_has_recipes.specific_diet_id=specific_diet.id
	join recipes on recipes.id = specific_diet_has_recipes.recipes_id
	where users.id = usersId and users.imc<=recipes.max_imc and recipes.type = typeRecipes
	GROUP BY recipes.id) T
	ORDER BY RANDOM() LIMIT 21;


END IF;


-- IF(typeRecipes = 1) THEN

-- 	RETURN QUERY
-- 	SELECT
-- 	--users.id,
-- 	DISTINCT recipes.id
-- 	FROM public.users
-- 	join users_choose_specific_diet on users_choose_specific_diet.users_id=users.id
-- 	join specific_diet on specific_diet.id=users_choose_specific_diet.specific_diet_id
-- 	join specific_diet_has_recipes on specific_diet_has_recipes.specific_diet_id=specific_diet.id
-- 	join recipes on recipes.id = specific_diet_has_recipes.recipes_id
-- 	where users.id = usersId and users.imc<=recipes.max_imc and (recipes.type = 2 OR recipes.type = 1) 
-- 	GROUP BY recipes.id LIMIT 21;

-- END IF;

IF(typeRecipes = 1) THEN

	RETURN QUERY
	SELECT * FROM (SELECT
	--users.id,
	DISTINCT recipes.id
	FROM public.users
	join users_choose_specific_diet on users_choose_specific_diet.users_id=users.id
	join specific_diet on specific_diet.id=users_choose_specific_diet.specific_diet_id
	join specific_diet_has_recipes on specific_diet_has_recipes.specific_diet_id=specific_diet.id
	join recipes on recipes.id = specific_diet_has_recipes.recipes_id
	where users.id = usersId and users.imc<=recipes.max_imc and (recipes.type = 2 OR recipes.type = 1) 
	GROUP BY recipes.id) T
	ORDER BY RANDOM() LIMIT 21;


END IF;



	END
$$ LANGUAGE plpgsql;



COMMIT;


--Pour test sous Pg Admin
-- premier parm le user 2eme le type de la recette
--SELECT recipesBy_IntolerancesAnd_Imc(1,1);