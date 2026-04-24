const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/authMiddleware");
const {
  createLearningNote,
  getLearningNotes,
  getLearningNoteById,
  updateLearningNote,
  deleteLearningNote,
  searchLearningNotes,
} = require("../controllers/learningNoteController");

router.use(verifyJWT);

router.get("/search", searchLearningNotes);
router.post("/", createLearningNote);
router.get("/", getLearningNotes);
router.get("/:id", getLearningNoteById);
router.put("/:id", updateLearningNote);
router.delete("/:id", deleteLearningNote);

module.exports = router;