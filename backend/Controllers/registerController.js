// controllers/registerController.js
const User = require('../Models/User');
const jwt = require('jsonwebtoken');

// Register new user
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Default role is 'user', if not provided
    const newRole = role || 'user'; 

    // Create a new user
    const newUser = new User({ username, password, role: newRole });
    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error registering user',
      error: err.message,
    });
  }
};

module.exports = registerUser;
