const config = require('./config.js');
const Sequelize = require("sequelize");

let dburl = `${config.database.dbdialect}://${config.database.dbuser}:${config.database.dbpassword}@${config.database.dbhost}:${config.database.dbport}/${config.database.database}`;
console.log(dburl)
const db = {};

// connect to db
const sequelize = new Sequelize(dburl);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// init the models and add it to the exported db object
db.Student = require('../models/student')(sequelize, Sequelize);
db.Profile = require('../models/profile')(sequelize, Sequelize);
db.Skill = require('../models/skill')(sequelize, Sequelize);
db.Teacher = require('../models/teacher')(sequelize, Sequelize);

// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
