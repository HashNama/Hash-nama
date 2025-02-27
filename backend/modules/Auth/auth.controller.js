const { registerValidator } = require("./auth.validators");
const authService = require("./auth.service");
const { successResponse } = require("../../helpers/responses");

exports.register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		await registerValidator.validate(
			{ username, email, password },
			{ abortEarly: false }
		);

		await Promise.all([
			authService.usernameExists(username),
			authService.emailExists(email),
		]);

		const hashedPassword = await authService.hashPassword(password);
		const user = await authService.createUserDocument(
			username,
			email,
			hashedPassword
		);

		const [accessToken, refreshToken] = await Promise.all([
			authService.createAccessToken(user._id),
			authService.createRefreshToken(user._id),
		]);

		authService.setRefreshTokenCookie(res, refreshToken);
		return successResponse(res, 201, { accessToken });
	} catch (err) {
		next(err);
	}
};

exports.login = (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};
