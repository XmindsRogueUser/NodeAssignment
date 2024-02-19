const skillRouter = require("express").Router();
const skillController = require("../controllers/SkillController");

skillRouter.get("/", skillController.getSkills);
skillRouter.post("/", skillController.createSkill);
skillRouter.put("/", skillController.updateSkill);
skillRouter.delete("/", skillController.deleteSkill);
module.exports = skillRouter;
