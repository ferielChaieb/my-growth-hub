const Project = require("../models/Project");
const Task = require("../models/Task");
const LearningNote = require("../models/LearningNote");
const Skill = require("../models/Skill");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalProjects = await Project.countDocuments({ user: userId });
    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "terminé",
    });
    const inProgressTasks = await Task.countDocuments({
      user: userId,
      status: "en cours",
    });
    const todoTasks = await Task.countDocuments({
      user: userId,
      status: "à faire",
    });
    const totalNotes = await LearningNote.countDocuments({ user: userId });
    const totalSkills = await Skill.countDocuments({ user: userId });

    return res.status(200).json({
      totalProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      totalNotes,
      totalSkills,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  getDashboardStats,
};