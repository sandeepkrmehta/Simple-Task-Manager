// routes/TaskRouter.js
const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require('../Controllers/TaskController');
const express = require('express');
const router = express.Router();
const authorizeRole = require('../Middleware/authorizeRole');

// Route to get all tasks (Accessible by all)
router.get('/', fetchAllTasks);

// Route to create a task (Accessible by all)
router.post('/', createTask);

// Route to update a task (Accessible only by admins)
router.put('/:id', authorizeRole(['admin']), updateTaskById);

// Route to delete a task (Accessible only by admins)
router.delete('/:id', authorizeRole(['admin']), deleteTaskById);

module.exports = router;
