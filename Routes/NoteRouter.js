// Routes/NoteRouter.js
const express = require('express');
const { createNote, getNotes, updateNote, deleteNote } = require('../Controllers/NoteController');
const authenticate = require('../Middlewares/Authenticate');

const router = express.Router();

// All routes below require authentication
router.use(authenticate);

router.post('/', createNote);        // Create note
router.get('/', getNotes);           // Get all notes
router.put('/:id', updateNote);      // Update note by ID
router.delete('/:id', deleteNote);   // Delete note by ID

module.exports = router;
