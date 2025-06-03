const { registerValidator, loginValidator } = require("./auth.validators");
const authService = require("./auth.service");
const { successResponse, errorResponse } = require("../../helpers/responses");

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

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		await loginValidator.validate(
			{ email, password },
			{ abortEarly: false }
		);

		const user = await authService.findUserByEmail(email);
		await authService.compareWithHashedPassword(user, password);

		const otp = await authService.createOTP();

		const [accessToken, refreshToken] = await Promise.all([
			authService.createAccessToken(user._id),
			authService.createRefreshToken(user._id),
		]);

		authService.setRefreshTokenCookie(res, refreshToken);
		return successResponse(res, 200, { accessToken, otp });
	} catch (err) {
		next(err);
	}
};

exports.refreshToken = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			return errorResponse(res, 401, "رفرش توکن موجود نیست");
		}

		const decoded = await authService.verifyRefreshToken(refreshToken);

		const accessToken = await authService.createAccessToken(decoded.userId);
		return successResponse(res, 200, { accessToken });
	} catch (err) {
		next(err);
	}
};
