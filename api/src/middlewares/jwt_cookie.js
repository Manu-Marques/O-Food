const debug = require('debug')('Middleware_JWT');
const env = require(`../env/${process.env.NODE_ENV}`)

const usersDataMapper = require('../database/models/users.datamapper');
const APIError = require('../Errors/APIError');

const secret = `${env.JWT_SECRET}`;
const jwt = require('jsonwebtoken');

//on a besoin de récupérer la réf de app pour pouvoir appliquer nos 2 middlewares
const { app } = require('../index');


// Fonction de création d'un Token JWT dans lequel on stocke l'id en BDD de notre user 
const createJwtToken = ({ user = null}) => {

  //Methode synchrone, si pas de passage de méthode de callback
  const jwtToken = jwt.sign({ 
    sub: user.id.toString(),
    // Math.floor(Date.now() / 1000)- > ~ 1seconde, donc + 5 = durée de 5 secondes( 60*60 1min)
    exp: Math.floor(Date.now() / 1000) + 5 
  }, secret );

  //{httpOnly:true}

  return jwtToken;
}

// Assignation de la méthode de création d'un token sur une clé createJwtToken 
exports.createJwtToken = createJwtToken;

// Middleware d'extraction du token envoyé par le front avec les infos du user à identifier
// l'objectif de ce middleware c'est d'ajouter le user sur l'objet req et le rendre dispo ailleurs dans le backend
const extractUserFromToken = async (req, res, next) => {

   //debug('req avt extraction jwt',req.cookies)

  //Ici on regarde à la réception d'une requête entrante si il y a un token dans son cookie 
  const token = req.cookies.jwt;

  //debug('clé jwt du token',token)
  //si pas de Token, l'utilisateur n'est considéré comme pas connecté
  if (token) {

    try {

      //verif et décodage (recup du contenu du payload) -> Methode synchrone, si pas de passage de méthode de callback

     // debug('debut décodage')
     let decodedToken = jwt.verify(token, secret, { ignoreExpiration: true });

     //fonction à debug plus tard
     //decodedToken = checkExpirationToken(decodedToken, res);

     //debug('Debug decodedToken : ',decodedToken)
    // debug('Debug decodedToken : ',decodedToken.sub)


      const user = await usersDataMapper.findUserPerId(parseInt(decodedToken.sub,10));

      //Ici on doit récupérer notre objet avec le contenu du payload (),
      // ici un objet avec sub et id du user -> infos de la création token avec sign
     // debug('Debug user récupéré en bdd après recup id par décodage token ',user)

      if (user) {

        //ici on place le user sur une clé user de l'objet req, pour le rendre dispo sur les middleware suivant
        req.user = user;

       // debug(' Debug req.user ',req.user)
        next();

      } else {

        //si on a pas trouvé de user correspand à cet id en bdd 
        res.clearCookie('jwt');
        res.status(404).json('pas de user en bdd');

      }
    } catch(e) {

      // si il y a une erreur sur la vérif du token, (et ce même que verify est synchrone ! )
      // soit le token à expiré, soit il a été modifié, etc.. il est pas valable! Donc on le DELETE !
      res.clearCookie('jwt');
      res.status(500).json('erreur fonct verif jwt');
    }
  } else {

    // debug('On sort direct',token)

    //Ici l'utilisateur n'est pas connecté, pas d'erreur on next simplement
    next();
  }
}

const checkExpirationToken = (token, res) => {
  const tokenExp = token.exp;
  const nowInSec = Math.floor(Date.now() / 1000);
  if (nowInSec <= tokenExp) {
    return token
  } else if (nowInSec > tokenExp && ((nowInSec - tokenExp) < 60 * 60 * 24) ) {
    const refreshedToken = createJwtToken({ id: token.sub });
    res.cookie('jwt', refreshedToken);
    return jwt.verify(refreshedToken, secret)
  } else {
    throw new Error('token expired');
  }
}

//Ici c'est un middleware
const addJwtFeatures = (req, res, next) => {

  // fonction qui retourne true ou false si l'utilisateur est authentifié ou pas
  // si on a req.user c'est qu'on a dejà récupérer et vérifier le user (1er middleware)
  req.isAuthenticated = () => !!req.user;
 

  //fonction permettant de supprimer le token depuis le coockie,
  // (Pour rappel il ne faut pas stocker le token en BDD ! à la sécu)
  req.logout = () => res.clearCookie('jwt')


  //fonction permettant la création d'un token à partir d'un user et de la stocker dans son coockie
  req.login = (user) => {

    const token = createJwtToken({ user });
    
    //ici on renvoie un cookie avec le jwt
    res.cookie('jwt', token);


  }

  next();

}

//"application des middlewares"
app.use(extractUserFromToken);
app.use(addJwtFeatures);
