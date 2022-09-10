const debug = require('debug')('Authenticated');

module.exports = (req, res, next) => {
    
  if (req.isAuthenticated()) {

   // debug('User authentifié');
  //  debug('User :',req.user)
    next();

  } else {

    res.status(403).json('not Authenticated');
  }
  
}