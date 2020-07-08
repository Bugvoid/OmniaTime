const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const routes = require("./routes.js");
const bot = require("./bot");

process.setMaxListeners(10);

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(
  "mongodb+srv://root:root@cluster0-huzkm.mongodb.net/OmniaPresente?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.listen(process.env.PORT, function() {
  bot.launch();
});
