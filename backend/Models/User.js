// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema definition
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure the username is unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user', // Default role is 'user'
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Only hash the password if it is modified
    this.password = await bcrypt.hash(this.password, 10); // Use 10 rounds for hashing
  }
  next(); // Continue with saving the user
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password); // Return comparison result
};

module.exports = mongoose.model('User', userSchema);
