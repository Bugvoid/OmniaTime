const mongoose = require("mongoose");

const TimecardSchema = new mongoose.Schema({
  date: String,
  hours: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  observation: String,
  approved: Boolean
});

module.exports = mongoose.model("Timecard", TimecardSchema);
