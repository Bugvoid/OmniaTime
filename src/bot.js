require("dotenv").config();
const Telegraf = require("telegraf");

const bot = new Telegraf(process.env.TOKEN_BOT);
const replies = require("./Config/replies");
bot.use(async (ctx, next) => {
  var start = new Date();
  await next();
  var ms = new Date() - start;
  console.log("Response time: %sms", ms);
});

bot.command("start", (ctx) => {
  ctx.reply(
    "Welcome OmniaPresente. \n Olá, antes de comecar, preciso cadastrar voce, me passa seu email por favor ^^"
  );
});

//Possiveis erros no Bot
bot.catch((err, ctx) => {
  console.log(`Ooops, encontrei uma possivel erro:  ${ctx.updateType}`, err);
});

bot.on("text", (ctx, next) => {
  replies.show(ctx);
  next();
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
