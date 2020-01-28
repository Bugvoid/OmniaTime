const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const bot = require("./src/bot");

process.setMaxListeners(10);

mongoose.connect(
  "mongodb+srv://root:root@cluster0-huzkm.mongodb.net/OmniaPresente?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

bot.launch();
