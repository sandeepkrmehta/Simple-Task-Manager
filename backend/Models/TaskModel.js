const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructuring for brevity

// Task Schema definition
const TaskSchema = new Schema({
    taskName: {
        type: String,
        required: [true, 'Task name is required'], // Added custom error message
    },
    isDone: {
        type: Boolean,
        required: [true, 'Task status (isDone) is required'], // Custom error message
        default: false, // Added default value for isDone
    },
});

// Create a model from the Task schema
const TaskModel = mongoose.model('Task', TaskSchema); // Changed collection name to 'Task'

module.exports = TaskModel;
