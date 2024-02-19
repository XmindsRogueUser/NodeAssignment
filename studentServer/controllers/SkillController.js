const db = require("../config/Database");
const Skill = db.Skill;

getSkills = async (req, res) => {
  try {
    let skill = null;
    if (req.query.id === undefined) {
      skill = await Skill.findAll();
    } else {
      skill = await Skill.findByPk(req.query.id);
    }
    if (skill == null) {
      res.status(400).end("No skill found with id " + req.query.id);
      return;
    }
    if (skill == 0) {
      res.status(400).end("Database is empty");
      return;
    }
    res.status(200).json({ skill: skill });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

createSkill = async (req, res) => {
  try {
    var { skillName } = req.body;
    const skill = await Skill.create({
      skillName,
    });
    res.status(200).json({ skill: skill });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

updateSkill = async (req, res) => {
  var { id, skillName } = req.body;
  if (id == undefined || id == null) {
    res.status(400).end("Please provide an id");
    return;
  }
  try {
    const skill = await Skill.update({ skillName }, { where: { skillId: id } });
    res.status(200).json({ skill: skill });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

deleteSkill = async (req, res) => {
  try {
    if (req.query.id == undefined || req.query.id == null) {
      res.status(400).end("Please provide an id");
      return;
    }
    const skill = await Skill.destroy({ where: { skillId: req.query.id } });
    if (skill == 0) {
      res.status(400).end("No skill found with id " + req.query.id);
      return;
    }
    res.status(200).json({ numberOfSkillsDeleted: skill });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
