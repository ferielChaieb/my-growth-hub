const Skill = require("../models/Skill");

// CREATE SKILL
const createSkill = async (req, res) => {
  const { name, level } = req.body || {};

  if (!name || level === undefined) {
    return res.status(400).json({
      message: "Le nom et le niveau sont obligatoires",
    });
  }

  try {
    const skill = await Skill.create({
      name,
      level,
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Compétence créée avec succès",
      skill,
    });
  } catch (error) {
    console.error("Create skill error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET ALL SKILLS OF CONNECTED USER
const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json(skills);
  } catch (error) {
    console.error("Get skills error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET ONE SKILL
const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({ message: "Compétence introuvable" });
    }

    return res.status(200).json(skill);
  } catch (error) {
    console.error("Get skill by id error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE SKILL
const updateSkill = async (req, res) => {
  const { name, level } = req.body || {};

  try {
    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({ message: "Compétence introuvable" });
    }

    skill.name = name ?? skill.name;
    skill.level = level ?? skill.level;

    const updatedSkill = await skill.save();

    return res.status(200).json({
      message: "Compétence mise à jour avec succès",
      skill: updatedSkill,
    });
  } catch (error) {
    console.error("Update skill error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE SKILL
const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({ message: "Compétence introuvable" });
    }

    await skill.deleteOne();

    return res.status(200).json({
      message: "Compétence supprimée avec succès",
    });
  } catch (error) {
    console.error("Delete skill error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createSkill,
  getSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};