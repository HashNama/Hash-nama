const watchListService = require("./watchList.service");
const { successResponse, errorResponse } = require("../../helpers/responses");

exports.addToWatchList = async (req, res, next) => {
	try {
		const user = req.user;
		const { coinId } = req.params;

		const isCoinExistsInWatchList =
			await watchListService.isCoinExistsInWatchList(user._id, coinId);

		if (isCoinExistsInWatchList) {
			return errorResponse(
				res,
				400,
				"کوین قبلا در واچلیست افزوده شده است"
			);
		}

		await watchListService.addCoinToWatchList(user._id, coinId);

		return successResponse(res, 201, {
			message: `کوین با موفقیت به واچلیست شما اضافه شد`,
		});
	} catch (err) {
		next(err);
	}
};

exports.getWatchList = async (req, res, next) => {
	try {
		const user = req.user;

		const watchList = await watchListService.getWatchList(user._id);

		return successResponse(res, 200, { watchList });
	} catch (err) {
		next(err);
	}
};

exports.removeFromWatchList = async (req, res, next) => {
	try {
		const user = req.user;
		const { coinId } = req.params;

		const isCoinExistsInWatchList =
			await watchListService.isCoinExistsInWatchList(user._id, coinId);

		if (!isCoinExistsInWatchList) {
			return errorResponse(res, 404, "کوین در واچلیست موجود نیست");
		}

		const removedData = await watchListService.removeCoinFromWatchList(
			user._id,
			coinId
		);
		return successResponse(res, 200, {
			message: `کوین ${removedData.coin.name} با موفقیت از واچلیست شما حذف شد`,
			data: removedData,
		});
	} catch (err) {
		next(err);
	}
};
