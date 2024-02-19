const express = require('express');
const cors = require('cors');
const db = require('./config/Database.js');
const configuration = require('./config/Config.js');
const studentRouter = require('./routes/StudentRouter.js');
const skillRouter = require('./routes/SkillRouter.js');
const teacherRouter = require('./routes/TeacherRouter.js');

const sequelize = db.sequelize;
const app = express();

app.use(express.json());
app.use(cors());
app.use('/student', studentRouter);
app.use('/skill', skillRouter);
app.use('/teacher', teacherRouter);

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