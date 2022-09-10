const client = require("../client_pg");
const debug = require("debug")("Meals_DataMapper");
const APIError = require("../../Errors/APIError");


const mealsDataMapper = {

  async getAllMealsByUserID(userId) {

    const query = {
   
      text:` SELECT users.id,meals.start_date, json_agg(recipes.*) AS recipesOfUser
      FROM "users"
      join meals on meals.users_id=users.id
      join recipes on recipes.id = meals.recipes_id
      where users.id = $1
     GROUP BY users.id,meals.start_date;`,
      values: [userId],
    };


    const results = await client.query(query);

    //debug('meals getAllMealsByUserID ',results.rows )

    if (!results.rowCount) {
      throw new APIError("This user have not meals saved in base.", 404);
    }
    return results.rows;

  },

  async postNewMeals(meals) {

    //pour le test fct version 2
    // const query = {
    //   text: `SELECT * FROM populate_meals_v2($1);`,
    //   values: [meals],
    // };

   
    const query = {
      text: `SELECT * FROM populate_meals_v3($1,$2,$3);`,
      values: [meals.start_date,meals.users_id,meals.recipes_id],
    };

    const results = await client.query(query);
    
    if(!results.rowCount){
      throw new APIError ("No recipe saved yet", 404);
    };

   // debug('fct_sql',results.rows)

    return results.rows;

  },


  async deleteMealsByUserID(userId){
  
    const query = { 
      text: `DELETE FROM "meals" WHERE users_id=$1;`,
      values: [userId],
    };
    const results = await client.query(query);
    
    
    //debug('results delete meals:', results);

    // if(!results.rowCount){
    //   return true;
    //   //   throw new APIError ("User have not specific diet saved in base.", 404)
    // };
    
    //return true;
  },








};


module.exports = mealsDataMapper;
