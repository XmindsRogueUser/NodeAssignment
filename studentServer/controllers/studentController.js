const db = require("../config/Database");
const Student = db.Student;
const Profile = db.Profile;
const Skill = db.Skill;
const Teacher = db.Teacher;

getStudents = async (req, res) => {
  try {
    let student = null;
    if (req.query.id === undefined) {
      student = await Student.findAll({
        include: [
          {
            model: Profile,
            attributes: ["profileName", "status", "bio", "profileImage"],
          },
          {
            model: Skill,
            attributes: ["skillName"],
          },
          {
            model: Teacher,
            attributes: ["firstName", "lastName", "subject"],
            through: { attributes: [] },
          },
        ],
      });
    } else {
      student = await Student.findByPk(req.query.id, {
        include: [
          {
            model: Profile,
            attributes: ["profileName", "status", "bio", "profileImage"],
          },
          {
            model: Skill,
            attributes: ["skillName"],
          },
          {
            model: Teacher,
            attributes: ["firstName", "lastName", "subject"],
          },
        ],
      });
    }
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
};

createStudent = async (req, res) => {
  try {
    var { firstName, lastName, rollNumber, grade, skillId, age } = req.body;
    const student = await Student.create({
      firstName,
      lastName,
      rollNumber,
      grade,
      age,
      skillId,
    });
    let profileName = firstName + " " + lastName;
    const profile = await Profile.create({
      studentId: student.id,
      profileName: profileName,
      bio: null,
      profileImage: null,
    });
    res.status(200).json({ student: student, profile: profile });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

updateStudent = async (req, res) => {
  var {
    id,
    firstName,
    lastName,
    rollNumber,
    grade,
    skillId,
    age,
    profileName,
    bio,
    profileImage,
    status,
  } = req.body;
  if (id == undefined || id == null) {
    res.status(400).end("Please provide an id");
    return;
  }
  try {
    const student = await Student.update(
      { firstName, lastName, rollNumber, grade, age, skillId },
      { where: { id: id } }
    );
    const profile = await Profile.update(
      {
        profileName: profileName,
        bio: bio,
        profileImage: profileImage,
        status: status,
      },
      { where: { studentId: id } }
    );
    res.status(200).json({ student: student, profile: profile });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

assignTeacher = async (req, res) => {
  var { studentId, teacherId } = req.body;
  if (
    studentId == undefined ||
    studentId == null ||
    teacherId == undefined ||
    teacherId == null
  ) {
    res.status(400).end("Please provide valid Ids");
    return;
  }
  try {
    student = await Student.findByPk(studentId);
    teacher = await Teacher.findByPk(teacherId);
    if (student == null) {
      res.status(400).end("No student found with id " + studentId);
      return;
    }
    if (teacher == null) {
      res.status(400).end("No teacher found with id " + teacherId);
      return;
    }
    student.addTeacher(teacher);
    res.status(200).json({ student: student, teacher: teacher });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

deleteStudent = async (req, res) => {
  try {
    requestBody = req.query;
    if (req.query.id == undefined || req.query.id == null) {
      res.status(400).end("Please provide an id");
      return;
    }
    const student = await Student.destroy({ where: { id: req.query.id } });
    if (student == 0) {
      res.status(400).end("No student found with id " + req.query.id);
      return;
    }
    res.status(200).json({ numberOfStudentDeleted: student });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  assignTeacher,
  deleteStudent,
};
