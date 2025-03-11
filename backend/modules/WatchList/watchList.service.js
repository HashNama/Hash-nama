const { isValidObjectId } = require("mongoose");
const WatchListModel = require("./../../models/WatchList");

exports.isCoinExistsInWatchList = async (userId, coinId) => {
	if (!isValidObjectId(coinId)) {
		throw { status: 400, message: "آیدی کوین نامعتبر است" };
	}

	const watchList = await WatchListModel.findOne({
		user: userId,
		coin: coinId,
	});

	return watchList ? true : false;
};

exports.addCoinToWatchList = async (userId, coinId) => {
	const newWatchListCoin = await WatchListModel.create({
		user: userId,
		coin: coinId,
	});

	if (!newWatchListCoin) {
		throw { status: "500", message: "Internal Server Error" };
	}

	return true;
};

exports.getWatchList = async (userId) => {
	const watchList = await WatchListModel.find({ user: userId })
		.populate("user", "username")
		.populate("coin");

	return watchList;
};

exports.removeCoinFromWatchList = async (userId, coinId) => {
	const removedData = await WatchListModel.findOneAndDelete({
		user: userId,
		coin: coinId,
	})
		.populate("coin", "name")
		.populate("user", "username");

	if (!removedData) throw { status: 500, message: "Internal Server Error" };

	return removedData;
};
