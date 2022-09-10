const express = require('express');
const specificDietController = require('../controllers/specificDiet.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');


// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const { specific_Diet_Schema } = require('../validation/schemas');

const specificDietRouter = require('express').Router();

specificDietRouter
.get('/', routerWrapper(specificDietController.getAllSpecificDiet))
.get('/:specific_dietId', routerWrapper(specificDietController.getSpecificDietInfosByID)) 

// post pour création de specific_diet à terminer
.post('/newspecificdiet',validate('body', specific_Diet_Schema), routerWrapper(specificDietController.addNewSpecificDiet))



specificDietRouter.use(handleError);

module.exports = specificDietRouter;