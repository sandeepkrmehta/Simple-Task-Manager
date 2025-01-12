// routes/registerRoute.js
const express = require('express');
const router = express.Router();
const registerUser = require('../Controllers/registerController');

// Register a new user
router.post('/', registerUser);

module.exports = router;
