const db = require('../config/database');
const Student = db.Student;

async function getStudents(id) {
    let student = null;
    if (id === undefined) {
        student = await Student.findAll();
    } else {
        student = await Student.findByPk(id);
    }
    return student;
}

async function createStudent(firstName, lastName, rollNumber, grade, age) {
    return await Student.create({ firstName, lastName, rollNumber, grade, age })
}

async function updateStudent(id, firstName, lastName, rollNumber, grade, age) {
    return await Student.update({ firstName, lastName, rollNumber, grade, age }, { where: { id: id } });
}

async function deleteStudent(id) {
    return await Student.destroy({ where: { id: id } });
}

module.exports = { getStudents, createStudent, updateStudent, deleteStudent }