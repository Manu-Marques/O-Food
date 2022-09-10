const debug = require('debug')('SpecificDiet_Controller');
const specificsDietDataMapper = require('../database/models/specificsDiet.datamapper');
const APIError = require('../Errors/APIError');

const specificDietController = {
 
    async getAllSpecificDiet(_, res) {
        const result = await specificsDietDataMapper.getAllSpecificDiet();
        res.status(200).json(result);
      },
      async getSpecificDietInfosByID(req, res) {
        const specific_dietId = req.params.specific_dietId;
        const result = await specificsDietDataMapper.getSpecificDietInfosByID(specific_dietId);
        res.status(200).json(result);
      },
      async addNewSpecificDiet(req,res){
        const specific_diet = req.body;
        const result = await specificsDietDataMapper.postNewSpecificDiet(specific_diet);
        res.status(201).json(result);
      },
      

};

module.exports = specificDietController;