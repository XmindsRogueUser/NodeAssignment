const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const config = require('./config/config.js');
const empRouter = require('./routes/employeeRouter.js');

const sequelize = db.sequelize;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/employee', empRouter);

// home
app.get('/home', async (req, res) => {
  console.log("home")
  res.send("Home")
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(config.port, () => {
  console.log(`server is listening  on ${config.port}`);
});

module.exports = app;