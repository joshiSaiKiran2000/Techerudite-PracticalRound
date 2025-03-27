const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
