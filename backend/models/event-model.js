const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    participants: [String],
    venue: { type: String, required: true },
    eventDate: { type: Date, required: true },
    startTime: String,
    endTime: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
