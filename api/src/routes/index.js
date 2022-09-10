const debug = require('debug')('Index_Router');
const express = require("express");
const router_index = express.Router();

const userRoutes = require('./user.routes');
const recipeRoutes = require('./recipe.routes')
const specificDietRoutes= require('./specific_diet.routes')
const mealRoutes=require('./meal.routes')


//pour gestion token par header sur authorization, attention pas de refresh  token en MVP
// nécessaire pour protéger nos routes
const auth_local = require('../middlewares/auth_local_storage') 
//debug('toto',auth_local);


// A réactiver pour gestion token par cookie 
// pour gestion token par cookie pour la V2 du projet 
// (ok coté back, à implémenter coté front)
// protection des routes 
// const is_auth = require('../middlewares/authenticated')
// Exemple de la protection sur la route
// router_index.get('/api/message1',is_auth,  (req, res) => {
// res.status(200).json({message :'API run'});
// });



// Adding subrouters
router_index.use('/api/users',userRoutes);
router_index.use('/api/recipes',auth_local,recipeRoutes);
router_index.use('/api/specific_diet',auth_local,specificDietRoutes);
router_index.use('/api/meals',auth_local,mealRoutes);



router_index.get('/api/message',  (req, res) => {

    res.status(200).json("hello depuis le back");
});


router_index.get('/api',auth_local,  (req, res) => {
    res.status(200).json({message :'API run'});
});







module.exports = router_index;
