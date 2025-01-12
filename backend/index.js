const express = require('express');
const app = express();
const cors = require('cors');
const TaskRouter = require('./Routes/TaskRouter');
const bodyParser = require('body-parser');
const registerRoute = require('./Routes/registerRoute');
const loginRoute = require('./Routes/loginRoute');
const PORT = process.env.PORT || 8080;
require('dotenv').config();
require('./Models/db');

// Basic route to check server status
app.get('/', (req, res) => {
    res.send('Hello from the server');
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Define routes
app.use('/tasks', TaskRouter);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT=${PORT}`);
});
