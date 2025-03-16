const { errorResponse, successResponse } = require("../../helpers/responses");
const walletService = require("./wallet.service");
const ethers = require("ethers");

exports.addWallet = async (req, res, next) => {
	try {
		const { address } = req.body;
		const user = req.user;

		const isValidAddress = ethers.isAddress(address);
		if (!isValidAddress) {
			return errorResponse(res, 400, "آدرس وارد شده معتبر نمیباشد");
		}
		await Promise.all([
			walletService.isWalletExistsInUserAccount(user._id, address),
			walletService.addWallet(user._id, address),
		]);

		return successResponse(res, 201, { message: "ولت با موفقیت اضافه شد" });
	} catch (err) {
		next(err);
	}
};
