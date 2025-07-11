const { isValidObjectId } = require("mongoose");
const AlertModel = require("./../../models/Alert");
const { sendAlertEmail } = require("./../../utils/email");
exports.addAlert = async (alertData) => {
	const { coinId, userId, currentPositionToReachTarget, price } = alertData;

	const createdAlert = await AlertModel.create({
		coinId,
		userId,
		currentPositionToReachTarget,
		price,
	});
	if (!createdAlert)
		throw { status: 500, message: "Something Went Wrong, Try Again!" };
	const alert = await AlertModel.findById(createdAlert._id)
		.populate("coinId", "price name symbol image marketCapRank")
		.populate("userId", "username email");

	return alert;
};

exports.getAlert = async (alertId) => {
	if (!isValidObjectId(alertId))
		throw { status: 400, message: "آیدی نامعتبر است" };

	const alert = await AlertModel.findById(alertId);
	return alert;
};

exports.updateAlert = async (alertId, price, currentPositionToReachTarget) => {
	const updatedAlert = await AlertModel.findByIdAndUpdate(
		alertId,
		{
			$set: { price, currentPositionToReachTarget },
		},
		{ new: true }
	);

	return updatedAlert;
};

exports.deleteAlertById = async (alertId) => {
	const deletedAlert = await AlertModel.findByIdAndDelete(alertId)
		.populate("coinId", "price name symbol image marketCapRank")
		.populate("userId", "username email");
	return deletedAlert;
};

exports.getAllUserAlerts = async (userId) => {
	const alerts = await AlertModel.find({ userId })
		.populate("coinId", "price name symbol image marketCapRank")
		.populate("userId", "username email")
		.lean();

	return alerts;
};

exports.sendAlertNotification = async () => {
	const alerts = await AlertModel.find({ reached: false })
		.populate("userId", "email")
		.populate("coinId");

	for (const alert of alerts) {
		const coin = alert.coinId;
		const currentCoinPrice = coin.price;
		const target = alert.price;
		const direction = alert.currentPositionToReachTarget;

		const userEmail = alert.userId.email;

		const reached =
			direction === "above"
				? currentCoinPrice <= target
				: currentCoinPrice > target;

		if (reached) {
			const sendEmailStatus = await sendAlertEmail(
				userEmail,
				coin.symbol,
				currentCoinPrice,
				direction,
				target
			);

			if (sendEmailStatus) {
				alert.reached = true;
				await alert.save();
			}
		}
	}
};
