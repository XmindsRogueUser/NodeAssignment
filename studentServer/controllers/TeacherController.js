const db = require("../config/Database");
const logger = require("../config/Logger.js")
const Teacher = db.Teacher;
const Student = db.Student;
const Profile = db.Profile;
const Skill = db.Skill;

listTeachers = async (req, res) => {
  let teacher = await Teacher.findAll({
    include: [
      {
        model: Student,
        attributes: ["firstName", "lastName", "rollNumber", "grade", "age"],
        through: { attributes: [] },
        include: [
          {
            model: Profile,
            attributes: ["profileName", "status", "bio", "profileImage"],
          },
          {
            model: Skill,
            attributes: ["skillName"],
          },
        ],
      },
    ],
  });
  res.status(200).json({ teacher: teacher });
};

getTeacher = async (req, res) => {
  try {
    let teacher = null;
    if (req.query.id === undefined || req.query.id === null) {
      res.status(400).end("Please provide an ID");
      return;
    } else {
      teacher = await Teacher.findByPk(req.query.id, {
        include: [
          {
            model: Student,
            attributes: ["firstName", "lastName", "rollNumber", "grade", "age"],
            through: { attributes: [] },
            include: [
              {
                model: Profile,
                attributes: ["profileName", "status", "bio", "profileImage"],
              },
              {
                model: Skill,
                attributes: ["skillName"],
              },
            ],
          },
        ],
      });
    }
    if (teacher == null) {
      res.status(400).end("No teacher found with id " + req.query.id);
      return;
    }
    res.status(200).json({ teacher: teacher });
  } catch (e) {
    logger.error("An Internal server error occured " + e);
    res.sendStatus(500);
  }
};

createTeacher = async (req, res) => {
  try {
    var { firstName, lastName, employeeNumber, subject, age } = req.body;
    const teacher = await Teacher.create({
      firstName,
      lastName,
      employeeNumber,
      subject,
      age,
    });
    res.status(200).json({ teacher: teacher });
  } catch (e) {
    logger.error("An Internal server error occured " + e);
    res.sendStatus(500);
  }
};

updateTeacher = async (req, res) => {
  var { id, firstName, lastName, employeeNumber, subject, age } = req.body;
  if (id == undefined || id == null) {
    res.status(400).end("Please provide an id");
    return;
  }
  try {
    const teacher = await Teacher.update(
      { firstName, lastName, employeeNumber, subject, age },
      { where: { id: id } }
    );
    res.status(200).json({ teacher: teacher });
  } catch (e) {
    logger.error("An Internal server error occured " + e);
    res.sendStatus(500);
  }
};

deleteTeacher = async (req, res) => {
  try {
    if (req.query.id == undefined || req.query.id == null) {
      res.status(400).end("Please provide an id");
      return;
    }
    const teacher = await Teacher.destroy({ where: { id: req.query.id } });
    if (teacher == 0) {
      res.status(400).end("No teacher found with id " + req.query.id);
      return;
    }
    res.status(200).json({ numberOfTeacherDeleted: teacher });
  } catch (e) {
    logger.error("An Internal server error occured " + e);
    res.sendStatus(500);
  }
};

module.exports = {
  listTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
