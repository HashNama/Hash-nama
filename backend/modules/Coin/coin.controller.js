const coinService = require("./coin.service");

exports.addCoin = async (req, res, next) => {
	try {
		console.log("succesffully");
	} catch (err) {
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
