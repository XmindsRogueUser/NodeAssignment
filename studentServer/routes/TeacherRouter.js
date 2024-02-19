const teacherRouter = require("express").Router();
const teacherController = require("../controllers/TeacherController");

teacherRouter.get("/", teacherController.getTeachers);
teacherRouter.post("/", teacherController.createTeacher);
teacherRouter.put("/", teacherController.updateTeacher);
teacherRouter.delete("/", teacherController.deleteTeacher);
module.exports = teacherRouter;
