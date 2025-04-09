const { isValidObjectId } = require("mongoose");
const AlertModel = require("./../../models/Alert");

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
