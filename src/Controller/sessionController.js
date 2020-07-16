const User = require("../Models/User");

module.exports = {
  async postUser(_id, name, email, ctx) {
    let user = await User.findOne({ _id });
    if (!user) {
      await User.create({ _id, name, email });
      ctx.reply("Cadastrado com sucesso" + name);
    } else {
      ctx.reply("Bem-Vindo de volta!!" + name);
    }
  },
};
