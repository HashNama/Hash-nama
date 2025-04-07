const { response } = require("express");
const { errorResponse, successResponse } = require("../../helpers/responses");
const marketDataService = require("./../Market/market.service");
const alertService = require("./alert.service");

async function getPosition(coinId, price) {
	try {
		const coin = await marketDataService.getCoinPrice(coinId);
		return +price > +coin.price ? "below" : "above";
	} catch (err) {
		throw { status: 500, message: "Something Went Wrong, Try Again!" };
	}
}
exports.addAlert = async (req, res, next) => {
	try {
		const { price, coinId } = req.body;
		const userId = req.user._id;

		const isCoinExists = await marketDataService.isCoinExists(coinId);
		if (!isCoinExists) {
			return errorResponse(res, 404, "هیچ کوینی با آیدی پیدا نشد!");
		}

		const currentPositionToReachTarget = await getPosition(coinId, price);

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

exports.updateAlert = async (req, res, next) => {
	try {
		const { alertId } = req.params;
		const { price } = req.body;

		const alert = await alertService.getAlert(alertId);
		if (!alert) {
			return errorResponse(res, 404, "هیچ هشداری با این آیدی یافت نشد!");
		}

		const currentPositionToReachTarget = await getPosition(
			alert.coinId,
			price
		);

		const updatedAlert = await alertService.updateAlert(
			alertId,
			price,
			currentPositionToReachTarget
		);

		if (!updatedAlert) {
			return errorResponse(res, 500, "Something Went Wrong, Try Again!");
		}

		return successResponse(res, 200, {
			message: "هشدار قیمتی با موفقیت آپدیت شد!",
			alert: updatedAlert,
		});
	} catch (err) {
		next(err);
	}
};
