-- Deploy ofood:2.add.seeding to pg

BEGIN;


INSERT INTO public.users(
	id, email, password, firstname, lastname, is_admin_role, profil_pic, sex, height, weight, imc, "createdAt", "updatedAt")
	VALUES (1, 'nicolas@free.fr','1234' ,'nico','rouille', true, 'gras', 'm', 180, 180, 20, '2022-04-01 08:00:00', '2022-04-01 18:01:00'),
           (2, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (3, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (4, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (5, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (6, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (7, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (8, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (9, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?),
           (10, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);


INSERT INTO public.recipes(
	id, photo_link, meal_time, max_imc, steps_desc, "createdAt", "updatedAt")
	VALUES (?, ?, ?, ?, ?, ?, ?);




INSERT INTO public.meals(
	id, start_date, users_id, recipes_id, "createdAt", "updatedAt")
	VALUES (?, ?, ?, ?, ?, ?);



INSERT INTO public.users_create_recipes(
	id, users_id, recipes_id, "createdAt", "updatedAt")
	VALUES (?, ?, ?, ?, ?);



INSERT INTO public.specific_diet(
	id, name, "createdAt", "updatedAt")
	VALUES (?, ?, ?, ?);



INSERT INTO public.specific_diet_has_recipes(
	id, specific_diet_id, recipes_id, "createdAt", "updatedAt")
	VALUES (?, ?, ?, ?, ?);



INSERT INTO public.users_choose_specific_diet(
	id, users_id, specific_diet_id, "createdAt", "updatedAt")
	VALUES (?, ?, ?, ?, ?);




COMMIT;
