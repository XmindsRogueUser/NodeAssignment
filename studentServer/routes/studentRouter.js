const studentRouter = require("express").Router();
const studentController = require("../controllers/StudentController");
const userValidation = require("../middleware/UserValidation.js");
const { verifyToken, isAdmin } = require("../middleware/Authorization.js");

studentRouter.get(
  "/list",
  verifyToken,
  isAdmin,
  studentController.listStudents
);
studentRouter.get("/", verifyToken, isAdmin, studentController.getStudent);
studentRouter.post(
  "/",
  userValidation.userValidationRules(),
  userValidation.validate,
  studentController.createStudent
);
studentRouter.put("/", verifyToken, isAdmin, studentController.updateStudent);
studentRouter.delete(
  "/",
  verifyToken,
  isAdmin,
  studentController.deleteStudent
);
studentRouter.patch(
  "/assign-teacher",
  verifyToken,
  isAdmin,
  studentController.assignTeacher
);
studentRouter.post("/sign-in", studentController.signIn);
module.exports = studentRouter;
