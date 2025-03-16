const WalletModel = require("./../../models/Wallet");

exports.isWalletExistsInUserAccount = async (userId, wallet) => {
	const isExists = await WalletModel.findOne({ userId, wallet });
	if (isExists) {
		throw { status: 400, message: "آدرس در حساب شما وجود دارد" };
	}
};
exports.addWallet = async (userId, wallet) => {
	const addedWallet = await WalletModel.create({ userId, wallet });

	if (!addedWallet) {
		throw { status: 500, message: "Somethin Went Wrong!" };
	}

	return true;
};
