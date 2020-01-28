require("dotenv").config();
const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.TOKEN_BOT);
const botTimeController = require("./Controller/botTimeCardController");
const sessionController = require("./Controller/sessionController");
const replies = require("./Config/replies");

bot.use(async (ctx, next) => {
  var start = new Date();
  await next();
  var ms = new Date() - start;
  console.log("Response time: %sms", ms);
});

bot.command("start", ctx => {
  ctx.reply(
    "Welcome OmniaPresente. \n Olá, antes de comecar, preciso cadastrar voce, me passa seu email por favor ^^"
  );
});

bot.on("text", async ctx => {
  var messageText = await ctx.update.message.text.toLowerCase();

  if (messageText.match("@")) {
    var name = await ctx.update.message.from.first_name;
    await sessionController.postUser(name, messageText);
    ctx.reply("Cadastrado com sucesso");
  } else if (messageText.match("marca")) {
    ctx.reply("Pode ser agora ou pode me dizer o horario expecifico?");
  } else if (messageText.match("agora")) {
    await botTimeController.postTimeNow();
  } else if (messageText.match("esqueci")) {
    ctx.reply(
      "Não se preocupe, me diga a data e os horarios separados por vingula"
    );
  } else if (messageText.match(",")) {
    botTimeController.postTime();
  } else {
    ctx.reply("Desculpe, não entendi");
  }

  //IDEIA
  // if (messageText.toLowerCase() == "comando") {
  //   ctx.reply(
  //     "Essas são as lista de Comandos que posso fazer: \n\n" +
  //       Object.keys(replies).join("\n")
  //   );
  // }
});

//IDEIA
// bot.command("list", ctx => {
//   ctx.reply(
//     "Essas são as lista de Comandos que posso fazer: \n\n"

//   );
// });

module.exports = bot;
