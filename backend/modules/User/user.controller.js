const userServices = require("./user.service");
const { errorResponse, successResponse } = require("../../helpers/responses");

exports.getUserInformation = async (req, res, next) => {
	try {
		const user = req.user;
		return successResponse(res, 200, {
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
				createdAt: user.createdAt,
			},
		});
	} catch (err) {
		next(err);
	}
};

exports.updateUserInformation = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};
