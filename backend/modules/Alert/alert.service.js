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
