const studentRouter = require('express').Router();
const studentController = require("../controllers/studentController");


studentRouter.get('/', studentController.getStudents);
studentRouter.post('/', studentController.createStudent);
studentRouter.put('/', studentController.updateStudent);
studentRouter.delete('/', studentController.deleteStudent);

studentRouter.get('/', async (req, res) => {
    try {
        requestBody = req.query;
        const student = await studentController.getStudents(requestBody.id);
        if (student == null) {
            res.status(400).end("No student found with id " + requestBody.id);
            return;
        }
        if (student == 0) {
            res.status(400).end("Database is empty");
            return;
        }
        res.status(200).json({ student: student });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

studentRouter.post('/', async (req, res) => {
    try {
        requestBody = req.body;
        const student = await studentController.createStudent(requestBody.firstName, requestBody.lastName, requestBody.rollNumber, requestBody.grade, requestBody.age);
        res.status(200).json({ student: student });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

studentRouter.put('/', async (req, res) => {
    requestBody = req.body;
    if (requestBody.id == undefined || requestBody.id == null) {
        res.status(400).end("Please provide an id");
        return;
    }
    try {
        const student = await studentController.updateStudent(requestBody.id, requestBody.firstName, requestBody.lastName, requestBody.rollNumber, requestBody.grade, requestBody.age);
        res.status(200).json({ student: student });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

studentRouter.delete('/', async (req, res) => {
    try {
        requestBody = req.query;
        if (requestBody.id == undefined || requestBody.id == null) {
            res.status(400).end("Please provide an id");
            return;
        }
        const student = await studentController.deleteStudent(requestBody.id);
        console.log(student)
        if (student == 0) {
            res.status(400).end("No student found with id " + requestBody.id);
            return;
        }
        res.status(200).json({ student: student });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
module.exports = studentRouter;