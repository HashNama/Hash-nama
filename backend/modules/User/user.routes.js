const express = require("express");
const controller = require("./user.controller");
const tokenAuth = require("../../middlewares/tokenAuth");

const router = express.Router();

router
	.route("/")
	.get(tokenAuth, controller.getUserInformation)
	.put(tokenAuth, controller.updateUserInformation)
	.delete(tokenAuth, controller.deleteUser);

module.exports = router;
