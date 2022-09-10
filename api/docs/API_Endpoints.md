## API Endpoints for MVP O_Food

method   | route  | description | returns | implemented ?
-------- | ------ | ----------- | ------- | -------
POST| users/signup | Create a new user in database| Return a feedback message (String) | Done
POST| users/login | Log in user, verifying credentials in database| Welcome back message (String) | Done
GET| users/logout | Log out user| Goodbye message (String) | Done
GET | /recipes | get all recipes already registered in databse | Array of Objet _recipes_ (JSON) | Done
GET | /specific_diet | get all specific_diet already registered in databse (if admin) | Array of Objet _specific_diet_ (JSON) | Done
GET | /meals/:users_id | get all the meals possessed by the requested user  | Array of Objet _recipes_ (JSON) | Done
POST| /recipes | Create a new recipes in database (if admin)| Return a feedback message (String) | Done
POST| /specific_diet | Create a new specific_diet (if admin) in database| Return a feedback message (String) | Done
POST | /meals/:users_id | Create all the meals of the week for one user  | Array of Objet _recipes_ (JSON) | Done
