const teacherRouter = require("express").Router();
const teacherController = require("../controllers/TeacherController");

teacherRouter.get("/list", teacherController.listTeachers);
teacherRouter.get("/", teacherController.getTeacher);
teacherRouter.post("/", teacherController.createTeacher);
teacherRouter.put("/", teacherController.updateTeacher);
teacherRouter.delete("/", teacherController.deleteTeacher);
module.exports = teacherRouter;
