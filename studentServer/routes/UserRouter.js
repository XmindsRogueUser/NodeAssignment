const userRouter = require("express").Router();
const userValidation = require("../middleware/UserValidation.js");
const db = require("../config/Database");
const User = db.User;

userRouter.post("/", userValidation.userValidationRules(), userValidation.validate, (req,res) => {
    User.create({
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
});
module.exports = userRouter;