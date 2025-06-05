const express = require("express");
const controller = require("./auth.controller.js");

const router = express.Router();

router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/refresh-token").post(controller.refreshToken);

router.route("/verify-otp").post(controller.verifyOTP);

module.exports = router;
