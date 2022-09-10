const client = require("../client_pg");
const debug = require("debug")("Recipes_DataMapper");
const APIError = require("../../Errors/APIError");

const recipesDataMapper = {

  async getAllRecipes() {
    const query = "SELECT * FROM recipes;";
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("No recipe saved yet", 404);
    }
    return results.rows;
  },

  async get21Recipes(type) {

    const query = {
      text: `SELECT * FROM "recipes"
             WHERE type=$1
             ORDER BY RANDOM() LIMIT 21;`,
      values: [type],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("No recipe saved yet", 404);
    }
    return results.rows;
  },

  async getRecipeById(recipeId) {

    debug('recipeId depuis datamapper',recipeId )
    const query = {
      text: `SELECT * FROM "recipes"
                  WHERE "id" = $1;`,
      values: [recipeId],
    };
    const results = await client.query(query);
    if (!results.rowCount) {
      throw new APIError("This recipe is still not saved in base.", 404);
    }
    return results.rows[0];
  },

  async postNewRecipe(recipe) {
    const query = {
      text: `INSERT INTO "recipes"("name","photo_link", "meal_time", "max_imc","type", "steps_desc","ingredient_desc") VALUES ($1,$2,$3,$4,$5,$5,$6,$7);`,
      values: [
        recipe.name,
        recipe.photo_link,
        recipe.meal_time,
        recipe.max_imc,
        recipe.type,
        recipe.steps_desc,
        recipe.ingredient_desc,
      ],
    };

    await client.query(query);
    return "The recipe has been saved into database";
  },

  async recipesBy_IntolerancesAnd_Imc(userId,typeRecipes) {
    const query = {
      text: `SELECT * FROM recipesBy_IntolerancesAnd_Imc($1,$2);`,
      values: [userId,typeRecipes],
    };

    const results = await client.query(query);
    
    if(!results.rowCount){
      throw new APIError ("No recipe match for this user", 404);
    };

    //debug('fct_sql_recipesBy_IntolerancesAnd_Imc',results.rows)

    return results.rows;
  },


};

module.exports = recipesDataMapper;
