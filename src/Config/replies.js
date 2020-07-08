const botTimeController = require("../Controller/botTimeCardController");
const sessionController = require("../Controller/sessionController");

module.exports = {
  async show(ctx) {
    var _id = await ctx.update.message.from.id;
    var name = await ctx.update.message.from.first_name;
    var messageText = await ctx.update.message.text.toLowerCase();

    if (messageText.match("@")) {
      await sessionController.postUser(_id, name, messageText);
      ctx.reply("Cadastrado com sucesso");
    } else if (messageText.match("marca")) {
      await botTimeController.postTimeNow(_id);
      ctx.reply("Marcado");
    } else if (messageText.match("esqueci")) {
      ctx.reply(
        "Não se preocupe, me diga a data e os horarios separados por vingula"
      );
    } else if (messageText.match(",")) {
      // botTimeController.postTime();
    } else {
      ctx.reply("Desculpe, não entendi");
    }
  },
};
