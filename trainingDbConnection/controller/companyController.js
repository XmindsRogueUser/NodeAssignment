const db = require("../config/db");
const Employee = db.Employee;
const Company = db.Company;

getAllCompanies = async (req, res) => {
    const companies = await Company.findAll({ include: [Employee] });
    res.status(200).json(companies);
};

createCompany = async (req, res) => {
    const company = await Company.create({ companyName: req.body.companyName });
    res.status(200).json(company);
};

deleteCompany = async (req, res) => {
    const company = await Company.destroy({ where: { id: req.query.id } });
    res.status(200).json(company);
};

module.exports = {
    getAllCompanies,
    createCompany,
    deleteCompany
};
