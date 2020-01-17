const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    participants: [String],
    eventDate: { type: Date, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
