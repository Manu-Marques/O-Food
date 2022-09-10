const APIError = require('../Errors/APIError');
const debug = require('debug')('Error_Handler');

  /**
   * Display error on terminal, then convert it into APIError instance (if it's not),
   * to be logged soon after and saved into log files and returned
   * To be used by individual routers, at the end of programmed routes
   * @route GET /v1/handleError
   * @group Middlewares
   * @param {req} request
   * @param {res} response
   * @param {next} next
   * @returns {APIError} in JSON format
   */

   const handleError = async (err, req, res, next) => {
    debug(err);
    let myError;
    if (err instanceof APIError) {
      // err est il une instance d'APIError
      myError = err;
    } else {
      // si mon erreur n'est pas de type APIError, alors je la transforme
      myError = new APIError(err, req.url);
    }
  
    // gestion des logs pour la plateforme (pour nous)
    await myError.log();
  
    // gestion du retour utilisateur
    res.status(myError.status).json(myError.message);
  };
  
  module.exports = handleError;