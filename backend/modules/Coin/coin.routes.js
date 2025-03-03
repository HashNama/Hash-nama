const express = require("express");
const coinController = require("./coin.controller");
const roleGaurd = require("./../../middlewares/roleGaurd");

const router = express.Router();

router
	.route("/")
	.post(roleGaurd("ADMIN"), coinController.addCoin)
	.get(coinController.getCoins)
	.delete(coinController.deleteCoin);

module.exports = router;
