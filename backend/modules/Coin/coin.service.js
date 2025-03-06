const CoinModel = require("../../models/Coin");

exports.addCoin = async (symbol, name, image) => {
	const coin = await CoinModel.create({ symbol, name, image });
	if (!coin) throw { status: 500, message: "Something went wrong" };
	return coin;
};
