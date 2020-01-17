const mongoose = require("mongoose");

const chatRoomSchema = mongoose.Schema({
  participants: [],
  chat: [
    {
      user: String,
      message: String,
      timestamp: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema);
