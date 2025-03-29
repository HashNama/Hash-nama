const WalletModel = require("./../../models/Wallet");

exports.isWalletExistsInUserAccount = async (userId) => {
	const isExists = await WalletModel.findOne({ userId });
	if (isExists) {
		throw { status: 400, message: "یک آدرس توسط شما ثبت شده است" };
	}
};
exports.addWallet = async (userId, wallet) => {
	const addedWallet = await WalletModel.create({ userId, wallet });

	if (!addedWallet) {
		throw { status: 500, message: "Somethin Went Wrong!" };
	}

	return true;
};
exports.getWalletAddress = async (userId) => {
	const address = await WalletModel.findOne({ userId });

	if (!address) {
		throw { status: 404, message: "not found wallet for this user" };
	}
	return address;
};
