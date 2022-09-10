const jwt = require('jsonwebtoken'); //nécessaire pour vérifier les tokens
const debug = require('debug')('Auth_local_storage');


// module.exports =(req, res, next)=>{

//     try {

//         debug(req.headers.authorization);
//         // va nous retourner un tableau avec bearer en 1er elt et le token en 2ème// on prend seulement le token 
//         const token = req.headers.authorization.split(' ')[1]; //si ça plante ça enverra une erreur atenntion au z de authorization
//         debug('token from req :', token)
//         const decodedToken=jwt.verify(token,'RANDOM_TOKEN_SECRET')// on doit lui donner en arg le token, ainsi que la clé secrete pour la vérif

//         debug('decodedToken',decodedToken)

//         const userId = decodedToken.userId;
//         debug('userID:', userId);
//         //Donc si on à un userId dans le corps la requête, on veut vérifier qu'il correspond à celui encrypter dans le Token
//         if (req.body.userId && req.body.userId !== userId){
//             throw 'user ID non valable !'
//         }else{
//             // autrement si tout est ok
//             debug('NEXT !!!!');
//             next(); //c'est un middleware appliquer avant nos controller de routes
//         }

//     } catch (error) {

//         res.status(401).json({ error:error | 'requête non authentifiée !' }) 
//         // si on reçoit une erreur on l'envoie, et si l'erreur vient des lignes codées dans le try on envoi :'requête non authentifiée !' 
//     }


// }

const auth_local_storage = (err, req, res, next) => {
    debug(err);

    try {
        
        debug(req.headers.authorization);
        // va nous retourner un tableau avec bearer en 1er elt et le token en 2ème// on prend seulement le token 
        const token = req.headers.authorization.split(' ')[1]; //si ça plante ça enverra une erreur atenntion au z de authorization
        debug('token from req :', token);
        const decodedToken=jwt.verify(token,'RANDOM_TOKEN_SECRET')// on doit lui donner en arg le token, ainsi que la clé secrete pour la vérif

        debug('decodedToken',decodedToken)

        const userId = decodedToken.userId;
        debug('userID:', userId);
        //Donc si on à un userId dans le corps la requête, on veut vérifier qu'il correspond à celui encrypter dans le Token
        if (req.body.userId && req.body.userId !== userId){
            throw 'user ID non valable !'
        }else{
            // autrement si tout est ok
            debug('NEXT !!!!');
            next(); //c'est un middleware appliquer avant nos controller de routes
        }

    } catch (error) {

        res.status(401).json({ error:error | 'requête non authentifiée !' }) 
        // si on reçoit une erreur on l'envoie, et si l'erreur vient des lignes codées dans le try on envoi :'requête non authentifiée !' 
    }
}

module.exports = auth_local_storage;