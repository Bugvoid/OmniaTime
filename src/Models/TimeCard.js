const mongoose = require("mongoose");

const TimecardSchema = new mongoose.Schema({
  date: String,
  hours: [String],
  user: {
    type: mongoose.Schema.Types.String,
    ref: "User"
  },
  observation: String
});

module.exports = mongoose.model("Timecard", TimecardSchema);
