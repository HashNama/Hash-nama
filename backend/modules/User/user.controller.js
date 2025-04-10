const userService = require("./user.service");
const authService = require("./../Auth/auth.service");
const { errorResponse, successResponse } = require("../../helpers/responses");
const { updateValidator } = require("./user.validator");

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
		const userId = req.user._id;
		const { username, password, email } = req.body;

		await updateValidator.validate(
			{ username, password, email },
			{ abortEarly: false }
		);
		const hashedPassword = await authService.hashPassword(password);

		const newInfos = {
			username,
			password: hashedPassword,
			email,
		};
		const updatedUser = await userService.updateUser(userId, newInfos);

		if (!updatedUser) {
			return errorResponse(res, 500, "Somrthing Went Wrong");
		}

		return successResponse(res, 200, {
			message: "اطلاعات کاربر با موفقیت ثبت شد!",
			user: updatedUser,
		});
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
