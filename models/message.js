const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema({
  msgFrom: {
    type: String,
    required: [true],
  },
  msgTo: {
    type: String,
    required: [true],
  },
  timeOfDelivery: {
    type: Date,
    required: [true],
  },
  msg: {
    type: String,
    required: [true, "Please add the msg"],
  },
});

module.exports = mongoose.model("conversations", msgSchema);
