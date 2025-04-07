const { response } = require("express");
const { errorResponse, successResponse } = require("../../helpers/responses");
const marketDataService = require("./../Market/market.service");
const alertService = require("./alert.service");

exports.addAlert = async (req, res, next) => {
	try {
		const { price, coinId } = req.body;
		const userId = req.user._id;

		const isCoinExists = await marketDataService.isCoinExists(coinId);
		if (!isCoinExists) {
			return errorResponse(res, 404, "هیچ کوینی با آیدی پیدا نشد!");
		}

		const currentCoinPrice = marketDataService.getCoinPrice(coinId);
		const currentPositionToReachTarget =
			Number(price) < currentCoinPrice ? "below" : "above";

		const alertData = {
			coinId,
			userId,
			currentPositionToReachTarget,
			price,
		};
		const alert = await alertService.addAlert(alertData);

		return successResponse(res, 201, {
			message: "هشدار قیمتی با موفقیت ثبت شد!",
			alert,
		});
	} catch (err) {
		next(err);
	}
};
