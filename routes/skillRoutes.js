const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/authMiddleware");
const {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

router.use(verifyJWT);

router.post("/", createSkill);
router.get("/", getSkills);
router.get("/:id", getSkillById);
router.put("/:id", updateSkill);
router.delete("/:id", deleteSkill);

module.exports = router;