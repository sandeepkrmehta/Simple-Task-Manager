// controllers/TaskController.js
const TaskModel = require("../Models/TaskModel");

// Create Task (Accessible by all users)
const createTask = async (req, res) => {
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: 'Task created successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create task', success: false });
    }
};

// Fetch all tasks (Accessible by all users)
const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({});
        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'No tasks found', success: false });
        }
        res.status(200).json({ message: 'All tasks retrieved successfully', success: true, data });
    } catch (err) {
        res.status(500).json({ message: 'Failed to get all tasks', success: false });
    }
};

// Update Task (Accessible only by admins)
const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updatedTask = await TaskModel.findByIdAndUpdate(id, { $set: body }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        res.status(200).json({ message: 'Task updated successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update task', success: false });
    }
};

// Delete Task (Accessible only by admins)
const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete task', success: false });
    }
};

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
};
