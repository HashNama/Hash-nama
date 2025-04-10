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

		const newInfos = {
			username,
			email,
		};

		// if password is provided, validate & hash
		if (password && password.trim() !== "") {
			const hashedPassword = await authService.hashPassword(password);
			newInfos.password = hashedPassword;
		}

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
		const userId = req.user._id;

		const deletedUser = await userService.deleteUser(userId);
		if (!deletedUser) {
			return errorResponse(res, 500, "Somrthing Went Wrong");
		}

		return successResponse(res, 200, {
			message: "اکانت کاربر با موفقیت حذف شد!",
			user: deletedUser,
		});
	} catch (err) {
		next(err);
	}
};
