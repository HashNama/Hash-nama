const express = require("express");
const controller = require("./auth.controller.js");

const router = express.Router();

router.route("/register").post(controller.register);
router.route("/login").get(controller.login);

module.exports = router;
