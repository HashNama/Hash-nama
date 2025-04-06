const express = require("express");
const controller = require("./market.controller");

const router = express.Router();

router.get("/", controller.getMarket);

module.exports = router;
