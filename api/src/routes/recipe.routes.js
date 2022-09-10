const express = require('express');
const recipeController = require('../controllers/recipe.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const {recipeSchema}  = require('../validation/schemas');

const recipeRouter = require('express').Router();

recipeRouter
.get('/', routerWrapper(recipeController.getAllRecipes))
.get('/:recipeId', routerWrapper(recipeController.getRecipeInfosByID)) 
// .post('/newrecipe',validate('body',recipeSchema), routerWrapper(recipeController.addNewRecipe))



recipeRouter.use(handleError);

module.exports = recipeRouter;