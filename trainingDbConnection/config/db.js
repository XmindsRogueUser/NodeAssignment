const config = require('./config.js');
// const hstore = require('pg-hstore')();
const Sequelize = require("sequelize");

console.log("dialect: " + config.database.dbdialect)
let dburl = `${config.database.dbdialect}://${config.database.dbuser}:${config.database.dbpassword}@${config.database.dbhost}:${config.database.dbport}/${config.database.database}`;
console.log(dburl)
const db = {};

// connect to db
const sequelize = new Sequelize(dburl);
console.log("=======our db===========");
console.log(db);


db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* For Testing */
// test = async () => {
//   try {
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
// }
// test();

module.exports = db;