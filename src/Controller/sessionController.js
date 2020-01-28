const User = require("../Models/User");

module.exports = {
  async postUser(name, email) {
    let user = await User.findOne({ email });

    if (!user) {
      await User.create({ name, email });
    }
  }
};
