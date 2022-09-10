const client = require('../client_pg');
const debug = require('debug')("SpecificDiet_DataMapper");
const APIError = require('../../Errors/APIError');
const { object } = require('joi');


const specificDietDataMapper = {

    async getAllSpecificDiet() {
        const query = 'SELECT * FROM specific_diet;';
        const results = await client.query(query);
        if(!results.rowCount){
          throw new APIError ("No specific diet saved yet", 404);
        };
        return results.rows;
      },

      async getSpecificDietInfosByID(specific_dietId){
        const query = { 
          text: `SELECT * FROM "specific_diet"
                  WHERE "id" = $1;`,
          values: [specific_dietId],
        };
        const results = await client.query(query);
        if(!results.rowCount){
          //throw new APIError ("This specific diet is still not saved in base.", 404);
          return false;

        };
        return results.rows[0];
      },

      async getSpecificDietByUserID(userId){

        const query = { 
          text: `SELECT users.id, specific_diet.name FROM "users"
          join users_choose_specific_diet on users_choose_specific_diet.users_id = users.id
          join specific_diet on users_choose_specific_diet.id =specific_diet.id
          where users.id = $1
		      GROUP BY users.id, specific_diet.name;`,
          values: [userId],
        };

      
        const results = await client.query(query);
        if(!results.rowCount){
          return 0
        };
        return results;
      },


      async deleteSpecificDietByUserID(userId){

        // debug(`************ ici on entre dans deleteSpecificDietByUserID`);
        
        const query = { 
          text: `DELETE FROM "users_choose_specific_diet" WHERE users_id=$1;`,
          values: [userId],
        };
        const results = await client.query(query);
        // debug('results toto:', results);

        // if(!results.rowCount){
        //   return true;
        //   throw new APIError ("User have not specific diet saved in base.", 404)
        // };
        
        return true;
      },


      async postNewSpecificDiet(specific_diet){

        const query = {
          text: `INSERT INTO "specific_diet"(name) VALUES ($1)`,
          values: [specific_diet.name],
        };
        await client.query(query);
        return 'The specific diet has been saved into database';
      },

      async postNewSpecificDiet_Of_userID(user){

        let i;

       for (const iterator of user.intolerances) {

            switch (iterator) {
              case 'sans lactose':
                i=1;
                break;

              case 'sans gluten':
                i=2;
                break;

              case 'vegetarien':
                i=3;
                break;

              case 'vegetalien':
                i=4;
                break;

              case 'sans porc':
                i=5;
                break;


            }


          const query = {
            text: `INSERT INTO "users_choose_specific_diet"(users_id, specific_diet_id)
                   VALUES ($1, $2);`,
            values: [user.id,i],
          };
          
          const results = await client.query(query);

          if(!results.rowCount){
            throw new APIError ("erreur : users_choose_specific_diet not saved in base.", 404)
          };

        }
        


      },

}

module.exports = specificDietDataMapper;