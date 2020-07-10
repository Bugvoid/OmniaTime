const TimeCard = require("../Models/TimeCard");
const User = require("../Models/User");
const replies = require("../Config/replies");

module.exports = {
  async postTimeNow(_id, ctx) {
    var now = new Date();
    var dia = now.getDate();
    var mes = now.getMonth() >= 10 ? now.getMonth() : now.getMonth() + 1;
    var ano = now.getFullYear();

    var data = dia + "/" + mes + "/" + ano;
    var hora = now.getHours() + ":" + now.getMinutes();
    var user = await User.findOne({ _id });
    var cardtime = await TimeCard.findOne({ user: _id, date: data });
    var hours = [];

    if (user) {
      if (cardtime == null) {
        hours.push(hora);
        await TimeCard.create({
          date: data,
          hours,
          user: _id,
        });
        ctx.reply("Marcado");
      } else if ((cardtime.date = data)) {
        hours = cardtime.hours;
        if (hours.length >= 4) {
          ctx.reply("Não posso marcar mais");
        } else {
          hours.push(hora);
          await TimeCard.findOneAndUpdate(
            { user: _id },
            {
              date: cardtime.date,
              hours,
              user: _id,
            }
          );
        }
      }
    }
  },
  async postTimeExpec() {},
  async postTimeObservation() {},
};
