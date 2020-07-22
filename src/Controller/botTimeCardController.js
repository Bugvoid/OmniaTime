const TimeCard = require("../Models/TimeCard");
const User = require("../Models/User");
const replies = require("../Config/replies");

var now = new Date();
var dia = now.getDate().toLocaleString("pt-br", {
  timeZone: "America/Sao_Paulo",
});
var diaF = dia.length == 1 ? "0" + dia : dia;
var mes = now.getMonth() + 1;
var mesF = mes < 10 ? "0" + mes : mes;
var ano = now.getFullYear();
var data = diaF + "/" + mesF + "/" + ano;
var hora = now.getHours().toLocaleString("pt-br", {
  timeZone: "America/Sao_Paulo",
});
var minuto = now.getMinutes().toLocaleString("pt-br", {
  timeZone: "America/Sao_Paulo",
});
var minutoF = minuto < 10 ? "0" + minuto : minuto;
var horaF = hora + ":" + minutoF;

console.log(horaF);

module.exports = {
  async postTimeNow(_id, ctx) {
    var user = await User.findOne({ _id });
    var cardtime = await TimeCard.findOne({ user: _id, date: data });
    var hours = [];

    if (user) {
      if (cardtime == null) {
        hours.push(horaF);
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
          hours.push(horaF);
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
