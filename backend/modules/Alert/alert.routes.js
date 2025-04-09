const express = require("express");
const controller = require("./alert.controller");
const tokenAuth = require("../../middlewares/tokenAuth");

const router = express.Router();

router
	.route("/")
	.get(tokenAuth, controller.getUserAlerts)
	.post(tokenAuth, controller.addAlert);
router
	.route("/:alertId")
	.put(tokenAuth, controller.updateAlert)
	.delete(tokenAuth, controller.deleteAlert);

module.exports = router;
