// routes/loginRoute.js
const express = require('express');
const router = express.Router();
const loginUser = require('../Controllers/loginController');

// Login user
router.post('/', loginUser);

module.exports = router;
