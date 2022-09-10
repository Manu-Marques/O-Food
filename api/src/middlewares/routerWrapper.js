const debug = require('debug')('Router_Wrapper');

/**
 * Wrap any called controller method with a try catch pattern
 * @route GET /v1/routerWrapper
 * @group - Middlewares
 * @param {req} request
 * @param {res} response
 * @param {next} next
 * @returns {method} if no error
 * @throws {err} intercept the emitted error to pass it to the upper layer with the Error Handler.
 */
 const routerWrapper = (method)=>{
  debug('On entre dans le wrapper');
  return async (req,res,next)=>{
      debug("URL",req.url);
      try{
          debug("router appelé");
          await method(req,res,next);
      }
      catch(err){
          debug("ERREUR",err);
          next(err);
      }
  }
};

module.exports = routerWrapper;