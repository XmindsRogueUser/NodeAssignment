const db = require('../config/db');
const Employee = db.Employee;

async function getAllEmployees() {
    const employees = await Employee.findAll();
    return employees;
}

async function createEmployees(name, designation, email, age) {
    const employees = await Employee.create({ name, designation, email, age })
    return employees;
}

async function updateEmployees(id, name, designation, email, age) {
    const employees = await Employee.update({ name, designation, email, age }, { where: { id: id } });
    return employees;
}

async function deleteEmployees(id) {
    const employees = await Employee.destroy({ where: { id: id } });
    return employees;
}

module.exports = { getAllEmployees, createEmployees, updateEmployees, deleteEmployees }