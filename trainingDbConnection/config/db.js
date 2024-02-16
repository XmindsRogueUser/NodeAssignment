const config = require('./config.js');
// const hstore = require('pg-hstore')();
const Sequelize = require("sequelize");

let dburl = `${config.database.dbdialect}://${config.database.dbuser}:${config.database.dbpassword}@${config.database.dbhost}:${config.database.dbport}/${config.database.database}`;
console.log(dburl)
const db = {};

/* connect to db */
const sequelize = new Sequelize(dburl);
db.Sequelize = Sequelize;
db.sequelize = sequelize;


/* init the Employee model and add it to the exported db object */
db.Employee = require('../models/employee')(sequelize, Sequelize);
db.Profile = require('../models/profile')(sequelize, Sequelize);
db.Company = require('../models/company')(sequelize, Sequelize);
db.Project = require('../models/project')(sequelize, Sequelize);

/* table associations */
db.Employee.hasOne(db.Profile, { foreignKey: "employeeId" });
db.Profile.belongsTo(db.Employee, { foreignKey: "employeeId" });
// can also be writted like 
// db.Employee.hasOne(db.Profile,);
// db.Profile.belongsTo(db.Employee);

db.Company.hasMany(db.Employee, { foreignKey: 'companyId' });
db.Employee.belongsTo(db.Company, { foreignKey: 'companyId' });

db.Employee.belongsToMany(db.Project, { through: 'employee_project' });
db.Project.belongsToMany(db.Employee, { through: 'employee_project' });

/* sync all models with database */
sequelize.sync({ alter: true });

module.exports = db;
