const express = require('express');
const cors = require('cors');
const db = require('./config/database.js');
const configuration = require('./config/config.js');
const studentRouter = require('./routes/studentRouter.js');

const sequelize = db.sequelize;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/student', studentRouter);

// Authenticate and test DB connection.
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Start server
app.listen(configuration.port, () => {
  console.log(`server is listening  on ${configuration.port}`);
});

module.exports = app;