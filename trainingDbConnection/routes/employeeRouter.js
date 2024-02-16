const empRouter = require('express').Router();
const employeeController = require("../controller/employeeController");

empRouter.get('/', async (req, res) => {
    try {
        const employees = await employeeController.getAllEmployees(req.query.id);
        res.status(200).json({ employees: employees });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

empRouter.post('/', async (req, res) => {
    try {
        requestBody = req.body;
        const employees = await employeeController.createEmployees(requestBody.name, requestBody.designation, requestBody.email, requestBody.age, requestBody.companyId);
        res.status(200).json({ employees: employees });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

empRouter.put('/', async (req, res) => {
    try {
        requestBody = req.body;
        const employees = await employeeController.updateEmployees(requestBody.id, requestBody.name, requestBody.designation, requestBody.email, requestBody.age);
        res.status(200).json({ employees: employees });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

empRouter.delete('/', async (req, res) => {
    try {
        requestBody = req.query;
        const employees = await employeeController.deleteEmployees(requestBody.id);
        res.status(200).json({ employees: employees });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});


module.exports = empRouter;