const { errorResponse, successResponse } = require("../../helpers/responses");
const coinService = require("./coin.service");
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

		return successResponse(res, 200, "کوین با موفقیت اضافه شد", coin);
	} catch (err) {
		if (req.file) fs.unlinkSync(req.file.path);
		next(err);
	}
};

exports.getCoins = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};

exports.deleteCoin = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};
