const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: [true],
  },
  Password: {
    type: String,
    required: [true],
  },
  CreatedDate: {
    type: Date,
    required: [true],
  },
});

module.exports = mongoose.model("user", userSchema);
