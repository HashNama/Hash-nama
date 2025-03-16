const express = require("express");
const coinController = require("./coin.controller");
const roleGaurd = require("./../../middlewares/roleGaurd");
const uploader = require("./../../utils/multerConfigs");
const router = express.Router();

const fileFormat = ["image/png", "image/jpeg", "image/jpg"];
const uploadPath = "backend/public/image/coins";

router
	.route("/")
	.post(
		roleGaurd("ADMIN"),
		uploader(uploadPath, fileFormat).single("image"),
		coinController.addCoin
	);

router.route("/getAll").get(coinController.getCoins);
//! Error
router.route("/:id").delete(roleGaurd("ADMIN"), coinController.deleteCoin);

module.exports = router;
