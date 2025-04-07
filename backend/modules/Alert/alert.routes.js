const express = require("express");
const controller = require("./alert.controller");
const tokenAuth = require("../../middlewares/tokenAuth");

const router = express.Router();

router.route("/").post(tokenAuth, controller.addAlert);
router.route("/:alertId").put(tokenAuth, controller.updateAlert);

module.exports = router;
