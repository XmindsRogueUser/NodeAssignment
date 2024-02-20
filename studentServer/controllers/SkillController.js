const db = require("../config/Database");
const logger = require("../config/Logger.js");
const Skill = db.Skill;

listSkills = async (req, res) => {
  let skill = await Skill.findAll();
  res.status(200).json({ skill: skill });
};

getSkill = async (req, res) => {
  try {
    let skill = null;
    if (req.query.id === undefined || req.query.id === null) {
      res.status(400).end("Please provide an ID");
      return;
    } else {
      skill = await Skill.findByPk(req.query.id);
    }
    if (skill == null) {
      res.status(400).end("No skill found with id " + req.query.id);
      return;
    }
    res.status(200).json({ skill: skill });
  } catch (e) {
    logger.error("An Internal server error occured " + e);
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
    logger.error("An Internal server error occured " + e);
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
    logger.error("An Internal server error occured " + e);
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
    logger.error("An Internal server error occured " + e);
    res.sendStatus(500);
  }
};

module.exports = {
  listSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
};
