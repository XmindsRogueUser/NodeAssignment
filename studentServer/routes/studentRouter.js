const studentRouter = require("express").Router();
const studentController = require("../controllers/StudentController");

studentRouter.get("/", studentController.getStudents);
studentRouter.post("/", studentController.createStudent);
studentRouter.put("/", studentController.updateStudent);
studentRouter.delete("/", studentController.deleteStudent);
studentRouter.patch("/assign-teacher", studentController.assignTeacher);
module.exports = studentRouter;
