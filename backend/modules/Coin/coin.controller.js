const { errorResponse, successResponse } = require("../../helpers/responses");
const coinService = require("./coin.service");
const fs = require("fs");
const { addCoinValidator } = require("./coin.validators");

exports.addCoin = async (req, res, next) => {
	try {
		const { symbol, name } = req.body;
		await addCoinValidator.validate(
			{ symbol, name },
			{ abortEarly: false }
		);

		//* upload image
		const image = req.file;
		if (!image) {
			return errorResponse(res, 400, "تصویر الزامی است");
		}

		const coin = await coinService.addCoin(
			symbol,
			name,
			`/image/coins/${image.filename}`
		);

		return successResponse(res, 201, "کوین با موفقیت اضافه شد", coin);
	} catch (err) {
		if (req.file) fs.unlinkSync(req.file.path);
		next(err);
	}
};

exports.getCoins = async (req, res, next) => {
	try {
		const { page = 1, limit = 25 } = req.query;

		//* validate page and limit
		if (isNaN(page) || isNaN(limit)) {
			return errorResponse(
				res,
				400,
				"page و limit باید مقدار عددی داشته باشند"
			);
		} else if (page <= 0 || limit <= 0) {
			return errorResponse(
				res,
				400,
				"page و limit باید مقدار بزرگتر از 0 داشته باشند"
			);
		}

		const coins = await coinService.getCoins(+page, +limit);
		return successResponse(res, 200, coins);
	} catch (err) {
		next(err);
	}
};

exports.deleteCoin = async (req, res, next) => {
	try {
		const { id } = req.params;
		const coin = await coinService.deleteCoin(id);

		//* delete image
		fs.unlinkSync(`./backend/public${coin.image}`);

		return successResponse(res, 200, {
			message: "کوین با موفقیت حذف شد",
			coin,
		});
	} catch (err) {
		next(err);
	}
};
