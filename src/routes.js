const express = require("express");
const routes = express.Router();
const DashboardController = require("./Controller/dashboarController");

routes.post("/sessions", DashboardController.login);
routes.get("/dashboard", DashboardController.show);
routes.post("/timecard/: id");

module.exports = routes;
