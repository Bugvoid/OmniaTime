const User = require("../Models/User");
const Timecard = require("../Models/TimeCard");

module.exports = {
  async login(req, res) {
    const { email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.json(null);
    }

    return res.json(user);
  },

  async show(req, res) {
    const { user_id } = req.headers;

    const spots = await Timecard.find({ user: user_id });

    return res.json(spots);
  }
};
