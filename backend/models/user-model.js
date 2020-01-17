const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  usertype: { type: String, required: true },
  batchYear: Number,
  college: String,
  location: String,
  profilePicture: String,
  dob: String,
  status: { type: Boolean, default: false },
});

userSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.isValid = function(hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
