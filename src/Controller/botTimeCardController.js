const TimeCard = require("../Models/TimeCard");
const User = require("../Models/User");
const replies = require("../Config/replies");

module.exports = {
  async postTimeNow(_id, ctx) {
    var now = new Date();
    var dia = now.getDate().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    var diaF = dia.length == 1 ? "0" + dia : dia;
    var mes = now.getMonth() + 1;
    var mesF = mes.length == 1 ? "0" + mes : mes;
    var ano = now.getFullYear();
    var data = diaF + "/" + mesF + "/" + ano;
    var hora = now
      .toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })
      .substr(10, 5);
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
            { user: _id, date: data },
            {
              date: cardtime.date,
              hours,
              user: _id,
            }
          );
          ctx.reply("Marcado");
        }
      }
    }
  },
  async postTimeExpec() {},
  async postTimeObservation() {},
};
