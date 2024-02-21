const logger = require("../config/Logger.js");
const jwt = require("jsonwebtoken");
const config = require("../config/Config.js");
const db = require("../config/Database.js");
const Student = db.Student;

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      logger.warn("Decoded : " + decoded);
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.userId;
    logger.info("Token authorized for user " + req.userId);
    next();
  });
};

const isAdmin = (req, res, next) => {
  Student.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].roleName === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

module.exports = { verifyToken, isAdmin };
