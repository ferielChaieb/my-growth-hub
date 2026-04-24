const LearningNote = require("../models/LearningNote");

// CREATE NOTE
const createLearningNote = async (req, res) => {
  const { title, description, tags, noteDate } = req.body || {};

  if (!title || !description) {
    return res.status(400).json({
      message: "Le titre et la description sont obligatoires",
    });
  }

  try {
    const note = await LearningNote.create({
      title,
      description,
      tags,
      noteDate,
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Note créée avec succès",
      note,
    });
  } catch (error) {
    console.error("Create learning note error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET ALL NOTES OF CONNECTED USER
const getLearningNotes = async (req, res) => {
  try {
    const notes = await LearningNote.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.status(200).json(notes);
  } catch (error) {
    console.error("Get learning notes error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET ONE NOTE
const getLearningNoteById = async (req, res) => {
  try {
    const note = await LearningNote.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note introuvable" });
    }

    return res.status(200).json(note);
  } catch (error) {
    console.error("Get learning note by id error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE NOTE
const updateLearningNote = async (req, res) => {
  const { title, description, tags, noteDate } = req.body || {};

  try {
    const note = await LearningNote.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note introuvable" });
    }

    note.title = title ?? note.title;
    note.description = description ?? note.description;
    note.tags = tags ?? note.tags;
    note.noteDate = noteDate ?? note.noteDate;

    const updatedNote = await note.save();

    return res.status(200).json({
      message: "Note mise à jour avec succès",
      note: updatedNote,
    });
  } catch (error) {
    console.error("Update learning note error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE NOTE
const deleteLearningNote = async (req, res) => {
  try {
    const note = await LearningNote.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note introuvable" });
    }

    await note.deleteOne();

    return res.status(200).json({
      message: "Note supprimée avec succès",
    });
  } catch (error) {
    console.error("Delete learning note error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// SEARCH NOTES
const searchLearningNotes = async (req, res) => {
  const { q } = req.query;

  try {
    const notes = await LearningNote.find({
      user: req.user.id,
      $or: [
        { title: { $regex: q || "", $options: "i" } },
        { description: { $regex: q || "", $options: "i" } },
        { tags: { $elemMatch: { $regex: q || "", $options: "i" } } },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json(notes);
  } catch (error) {
    console.error("Search learning notes error:", error.message);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createLearningNote,
  getLearningNotes,
  getLearningNoteById,
  updateLearningNote,
  deleteLearningNote,
  searchLearningNotes,
};