const config = require("./Config.js");
const Sequelize = require("sequelize");

let dburl = `${config.database.dbdialect}://${config.database.dbuser}:${config.database.dbpassword}@${config.database.dbhost}:${config.database.dbport}/${config.database.database}`;
console.log(dburl);
const db = {};

// connect to db
const sequelize = new Sequelize(dburl);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// init the models and add it to the exported db object
db.Student = require("../models/Student.js")(sequelize, Sequelize);
db.Profile = require("../models/Profile.js")(sequelize, Sequelize);
db.Skill = require("../models/Skill.js")(sequelize, Sequelize);
db.Teacher = require("../models/Teacher.js")(sequelize, Sequelize);
db.Role = require("../models/Role.js")(sequelize, Sequelize);

/* table associations */
db.Student.hasOne(db.Profile, { foreignKey: "studentId" });
db.Profile.belongsTo(db.Student, { foreignKey: "studentId" });

db.Skill.hasMany(db.Student, { foreignKey: "skillId" });
db.Student.belongsTo(db.Skill, { foreignKey: "skillId" });

db.Student.belongsToMany(db.Teacher, { through: "student_teacher_mapping" });
db.Teacher.belongsToMany(db.Student, { through: "student_teacher_mapping" });

db.Student.belongsToMany(db.Role, { through: "student_role_mapping" });
db.Role.belongsToMany(db.Student, { through: "student_role_mapping" });

// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;
