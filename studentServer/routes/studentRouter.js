const studentRouter = require("express").Router();
const studentController = require("../controllers/StudentController");
const userValidation = require("../middleware/UserValidation.js");

studentRouter.get("/list", studentController.listStudents);
studentRouter.get("/", studentController.getStudent);
studentRouter.post(
  "/",
  userValidation.userValidationRules(),
  userValidation.validate,
  studentController.createStudent
);
studentRouter.put("/", studentController.updateStudent);
studentRouter.delete("/", studentController.deleteStudent);
studentRouter.patch("/assign-teacher", studentController.assignTeacher);
studentRouter.post("/sign-in", studentController.signIn);
module.exports = studentRouter;
