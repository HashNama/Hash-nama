const { isValidObjectId } = require("mongoose");
const CoinModel = require("../../models/Coin");

exports.addCoin = async (symbol, name, image) => {
	const coin = await CoinModel.create({ symbol, name, image });
	if (!coin) throw { status: 500, message: "Something went wrong" };
	return coin;
};

exports.deleteCoin = async (id) => {
	if (!isValidObjectId(id))
		throw { status: 400, message: "آیدی کوین نامعتبر است" };
	console.log(id);
	const coin = await CoinModel.findByIdAndDelete(id);
	if (!coin) throw { status: 404, message: "کوین پیدا نشد" };
	return coin;
};

exports.getCoins = async (page, limit) => {
	const coins = await CoinModel.find()
		.skip((page - 1) * limit)
		.limit(limit);
	const total = await CoinModel.countDocuments();
	const pagination = {
		total,
		page,
		limit,
	};
	return { coins, pagination };
};
