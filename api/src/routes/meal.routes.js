const express = require('express');
const mealController = require('../controllers/meal.controller');

// Gestion des erreurs
const handleError = require('../middlewares/handleError');
const routerWrapper = require('../middlewares/routerWrapper');

// Joi validation compulsary for each payload containing data
const validate = require('../validation/validator');
const { specific_Diet_Schema } = require('../validation/schemas');

const mealRouter = require('express').Router();

 mealRouter
  .get('/:userId', routerWrapper(mealController.getAllMealsByUserID)) 
  .post('/:userId/postnewmeals', routerWrapper(mealController.postNewMeals))




mealRouter.use(handleError);

module.exports = mealRouter;