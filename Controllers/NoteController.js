// Controllers/NoteController.js
const Note = require('../Models/Note');

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      user: req.user._id,
      title,
      content,
    });
    await newNote.save();
    res.status(201).json({ success: true, message: 'Note created', note: newNote });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create note' });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch notes' });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: req.user._id }, 
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    res.status(200).json({ success: true, message: 'Note updated', note: updatedNote });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update note' });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    res.status(200).json({ success: true, message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete note' });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
