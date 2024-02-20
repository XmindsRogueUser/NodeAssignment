const db = require("../config/Database");
const logger = require("../config/Logger.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/Config.js");
const Student = db.Student;
const Profile = db.Profile;
const Skill = db.Skill;
const Teacher = db.Teacher;

listStudents = async (req, res) => {
  let student = await Student.findAll({
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
  res.status(200).json({ student: student });
};

getStudent = async (req, res) => {
  try {
    let student = null;
    if (req.query.id === undefined || req.query.id === null) {
      res.status(400).end("Please provide an ID");
      return;
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
    res.status(200).json({ student: student });
  } catch (e) {
    logger.error("An Internal server error occured " + e);
    res.sendStatus(500);
  }
};

createStudent = async (req, res) => {
  try {
    var {
      firstName,
      lastName,
      rollNumber,
      grade,
      skillId,
      age,
      email,
      password,
      roleId,
    } = req.body;
    let encriptedPassword = bcrypt.hashSync(password, 8);
    // If no roles provided, set the user role to 1
    if (!roleId) {
      roleId = 1;
      logger.warn("Student role not found, setting default role!");
    }
    const student = await Student.create({
      firstName,
      lastName,
      rollNumber,
      grade,
      age,
      skillId,
      email,
      password: encriptedPassword,
      useRole: roleId,
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
    logger.error("An Internal server error occured " + e);
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
    logger.error("An Internal server error occured " + e);
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
    logger.error("An Internal server error occured " + e);
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
    logger.error("An Internal server error occured " + e);
    res.sendStatus(500);
  }
};

signIn = async (req, res) => {
  const appUser = await Student.findOne({ where: { email: req.body.email } });
  if (appUser == null) {
    res.status(400).end("Student not found");
    return;
  }
  const match = await bcrypt.compare(req.body.password, appUser.password);
  logger.info(config.jwt.expireTime + " --> " + config.jwt.secret);
  const accessToken = jwt.sign({ userId: appUser.id }, config.jwt.secret, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: config.jwt.expireTime,
  });
  if (match) {
    res.json({ accessToken: accessToken });
  } else {
    res.json({ message: "Invalid Credentials" });
  }
};

module.exports = {
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  assignTeacher,
  deleteStudent,
  signIn,
};
