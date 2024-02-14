const router = require('express').Router();
const empData = require("../employee_module/employeeData");

let employee = function (id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
};

// API for listing and getting employees
router.get('/list', (req, res) => {
    requestBody = req.query;
    if (requestBody.id === undefined) {
        res.send(JSON.stringify(empData.employeeData));
    } else {
        employee = empData.findById(requestBody.id);
        if (employee === null) {
            res.send("No employee with id " + requestBody.id + " exists.");
            return;
        } else {
            res.send(JSON.stringify(employee));
        }
    }
})

// API for creating new employess
router.post('/create', (req, res) => {
    requestBody = req.body;
    if (empData.findById(requestBody.id) !== null) {
        res.send("An employee with id " + requestBody.id + " already exists.");
        return;
    }
    let employeeObject = new employee(
        requestBody.id,
        requestBody.firstName,
        requestBody.lastName,
        requestBody.age);
    empData.employeeData.push(employeeObject)
    res.send(JSON.stringify(employeeObject));
    console.log("Employee created");
})

// API for deleting existing employess
router.delete('/remove', (req, res) => {
    requestBody = req.query;
    if (requestBody.id === undefined) {
        res.send("Please provide an Employee ID.");
    } else {
        employee = empData.findById(requestBody.id);
        if (employee === null) {
            res.send("No employee with id " + requestBody.id + " exists.");
        } else {
            empData.employeeData.splice(empData.employeeData.findIndex(emp => emp.id == requestBody.id), 1);
            res.send(JSON.stringify(employee));
            console.log("Employee deleted");
        }
    }
})

// API for updating existing employess
router.put('/update', (req, res) => {
    requestBody = req.body;
    console.log(requestBody)
    if (requestBody.id === undefined) {
        res.send("Please provide an Employee ID.");
        return;
    }
    if (empData.findById(requestBody.id) == null) {
        res.send("An employee with id " + requestBody.id + " does not exists.");
        return;
    }
    let employeeToBeUpdated = new employee(
        requestBody.id,
        requestBody.firstName,
        requestBody.lastName,
        requestBody.age);
    empData.employeeData.splice(empData.employeeData.findIndex(empObj => empObj.id == requestBody.id), 1, employeeToBeUpdated);
    res.send(JSON.stringify(employeeToBeUpdated));
    console.log("Employee updated");
})

module.exports = router;