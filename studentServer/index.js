const express = require("express");
const cors = require("cors");
const db = require("./config/Database.js");
const configuration = require("./config/Config.js");
const studentRouter = require("./routes/StudentRouter.js");
const skillRouter = require("./routes/SkillRouter.js");
const teacherRouter = require("./routes/TeacherRouter.js");
const logger = require("./config/Logger.js");
const {verifyToken} = require("./middleware/Authorization.js");

const sequelize = db.sequelize;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, done) => {
  logger.info("Incomming API request : " + req.originalUrl);
  done();
  if (res.status != 200) {
    logger.error(
      "API failed to create response(Status:" +
        res.statusCode +
        ", URI: " +
        req.originalUrl +
        ")"
    );
  }
});
app.use("/student", studentRouter);
app.use("/skill", verifyToken, skillRouter);
app.use("/teacher", verifyToken, teacherRouter);

// Authenticate and test DB connection.
sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
  })
  .catch((err) => {
    logger.error("Unable to connect to the database:", err);
  });

// Start server
app.listen(configuration.port, () => {
  console.log(`server is listening  on ${configuration.port}`);
});

module.exports = app;
