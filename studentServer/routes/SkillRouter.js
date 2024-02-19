const skillRouter = require("express").Router();
const skillController = require("../controllers/SkillController");

skillRouter.get("/list", skillController.listSkills);
skillRouter.get("/", skillController.getSkill);
skillRouter.post("/", skillController.createSkill);
skillRouter.put("/", skillController.updateSkill);
skillRouter.delete("/", skillController.deleteSkill);
module.exports = skillRouter;
