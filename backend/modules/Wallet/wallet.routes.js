const express = require("express");
const controller = require("./wallet.controller");
const tokenAuth = require("./../../middlewares/tokenAuth");

const router = express.Router();

router
	.route("/")
	.post(tokenAuth, controller.addWallet)
	.get(tokenAuth, controller.getWalletAssets)
	.delete(tokenAuth, controller.deleteWallet);

module.exports = router;
