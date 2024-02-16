const db = require('../config/db');
const Employee = db.Employee;
const Profile = db.Profile;
const Company = db.Company;

async function getAllEmployees(id) {
    let employees = null;
    if (id === undefined) {
        employees = await Employee.findAll();
    } else {
        employees = await Employee.findByPk(id, {
            include: [
                {
                    model: Profile,
                    attributes: ["profileName", "rollNumber"]
                },
                {
                    model: Company,
                    attributes: ["companyName", "status"]
                }
            ]
        });
    }
    return employees;
}

async function createEmployees(name, designation, email, age, companyId) {
    const employee = await Employee.create({ name, designation, email, age, companyId })
    return await Profile.create({ employeeId: employee.id, profileName: employee.name, rollNumber: "EMP" + employee.id, profileImage: "NONE" })
}

async function updateEmployees(id, name, designation, email, age,) {
    const employees = await Employee.update({ name, designation, email, age }, { where: { id: id } })
    // follow above live with .then(Profile.create({})); to update profile
    return employees;
}

async function deleteEmployees(id) {
    const employees = await Employee.destroy({ where: { id: id } });
    return employees;
}

module.exports = { getAllEmployees, createEmployees, updateEmployees, deleteEmployees }