const Task = require("../models/Task");

// CREATE TASK
const createTask = async (req, res) => {
  const { title, description, status } = req.body || {};

  if (!title) {
    return res.status(400).json({ message: "Le titre est obligatoire" });
  }

  try {
    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Tâche créée avec succès",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET ALL TASKS OF CONNECTED USER
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET ONE TASK
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error("Get task by id error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE TASK
const updateTask = async (req, res) => {
  const { title, description, status } = req.body || {};

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;

    const updatedTask = await task.save();

    return res.status(200).json({
      message: "Tâche mise à jour avec succès",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update task error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Tâche introuvable" });
    }

    await task.deleteOne();

    return res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    console.error("Delete task error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};