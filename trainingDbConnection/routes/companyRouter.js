const compRouter = require('express').Router();
const companyController = require("../controller/companyController");

compRouter.get('/', companyController.getAllCompanies);
compRouter.post('/', companyController.createCompany);
compRouter.delete('/', companyController.deleteCompany);

module.exports = compRouter;
