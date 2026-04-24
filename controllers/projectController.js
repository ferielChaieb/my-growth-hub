const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {
  const { title, description, technologies, image, githubUrl, liveUrl } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Le titre et la description sont obligatoires" });
  }

  try {
    const project = await Project.create({
      title,
      description,
      technologies,
      image,
      githubUrl,
      liveUrl,
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Projet créé avec succès",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET ALL PROJECTS OF CONNECTED USER
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json(projects);
  } catch (error) {
    console.error("Get projects error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET ONE PROJECT
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.error("Get project by id error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  const { title, description, technologies, image, githubUrl, liveUrl } = req.body;

  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.technologies = technologies ?? project.technologies;
    project.image = image ?? project.image;
    project.githubUrl = githubUrl ?? project.githubUrl;
    project.liveUrl = liveUrl ?? project.liveUrl;

    const updatedProject = await project.save();

    return res.status(200).json({
      message: "Projet mis à jour avec succès",
      project: updatedProject,
    });
  } catch (error) {
    console.error("Update project error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    await project.deleteOne();

    return res.status(200).json({ message: "Projet supprimé avec succès" });
  } catch (error) {
    console.error("Delete project error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};