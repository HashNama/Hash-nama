const express = require("express");
const watchListController = require("./watchList.controller");
const tokenAuth = require("../../middlewares/tokenAuth");

const router = express.Router();

router.route("/").get(tokenAuth, watchListController.getWatchList);
router
	.route("/:coinId")
	.post(tokenAuth, watchListController.addToWatchList)
	.delete(tokenAuth, watchListController.removeFromWatchList);

module.exports = router;
