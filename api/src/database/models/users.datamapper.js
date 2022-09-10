const client = require('../client_pg');
const debug = require('debug')("User_DataMapper");
const APIError = require('../../Errors/APIError');

const bcrypt = require('bcrypt');

const usersDataMapper = {

  async createUser(user) {


      let {email, password} = user;
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password,salt);
   
      const query = {
        text : `INSERT INTO "users"(email, password) VALUES ($1,$2) RETURNING *`,
        values:[email,encryptedPassword],
      };
      const results = await client.query(query);
      
      if(!results.rowCount){
        throw new APIError ("This email is already taken. Please choose another one.", 404);
      };

    // debug('User successfully registered, please login to continue.');
    //debug(results.rows[0]);
      return (results.rows[0]);
  
  },
  
  // Khadim
  async getUserByID(id) {
    const query = {
      text: `SELECT * FROM "users" WHERE id = $1`,
      values: [id],
    };
    const results = await client.query(query);
    debug('user by ID : ', results);
    if(!results.rowCount){
      throw new APIError ("This account doesn't exist.", 404);
    };
    return results.rows[0];
  },

  async findUserPerEmail(user) {
    const query = {
      text : `SELECT * FROM "users"
              WHERE email = $1`,
      values:[user.email],
    }
    const results = await client.query(query);
    debug('que retourne til ? ', results)
    if(!results.rowCount){
      throw new APIError ("This account doesn't exist.", 404);
    };
    const isCorrect = await bcrypt.compare(user.password,results.rows[0].password);
    if(!isCorrect){
      throw new APIError("Credentials don't match, please retry.",404);
    }
    //debug('return query :', results.rows[0])
    return results.rows[0];
  },

  
  async findUserPerId(id){

    //debug('id récupéré depuis décodage token :', id)

    const query = {
      text : `SELECT * FROM "users"
              WHERE id = $1`,
      values:[id],
    }
    const results = await client.query(query);
    if(!results.rowCount){
      throw new APIError ("This account doesn't exist.", 404);
    };

    //si on arrive ici c'est qu'on a un token valide, dans lequel on a récupéré l'id du user donc plus besoin de vérifier son MP avec bcrypt
    //debug('user récupéré par id :', id)


    return results.rows[0];
  },


  async findUserPerIdAndUpdate(user){

    //si on arrive ici c'est qu'on a un token valide

    
    let {id, firstname, lastname, profil_pic, sex, height, weight, imc,profil_is_completed } = user;

    const query = {
      text : `UPDATE "users"
              SET firstname=$1, lastname=$2, sex=$3, height=$4, weight=$5, imc=$6, profil_is_completed=$7,"updatedAt"=now()
              WHERE id=$8 RETURNING *;`,
      values:[firstname, lastname, sex, height, weight, imc,profil_is_completed, id],
    }

    const results = await client.query(query);

    if(!results.rowCount){
      throw new APIError ("This account doesn't exist.", 404);
    };

    debug('user updaté :', results.rows[0])

    return results.rows[0];

  },


/**
   * Return a list containing all registered users
   * @returns {ARRAY} of pseudos String
   * @throws {APIError} if the table user is empty
   */
   async GetUsers(){
    const query = `SELECT * FROM "users";`;
    const results = await client.query(query);

    debug(results.rows)

    if(!results.rowCount){
      throw new APIError ("No user in BDD.", 404);
    };
    return results.rows;
  },

}

module.exports = usersDataMapper;