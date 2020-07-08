const User = require("../Models/User");

module.exports = {
  async postUser(_id, name, email) {
    let user = await User.findOne({ email });

    if (!user) {
      await User.create({ _id, name, email });
    }

    
  }
};
