const { registerValidator, loginValidator } = require("./auth.validators");
const authService = require("./auth.service");
const { successResponse, errorResponse } = require("../../helpers/responses");
const { sendOtpEmail } = require("./../../utils/email");
const { email } = require("../../configs");

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

		const otp = await authService.createOTP(email);
		if (!otp) {
			return errorResponse(res, 500, "Something Went Wrong!");
		}

		const isSent = await sendOtpEmail(email, otp.code);
		if (!isSent) {
			return errorResponse(res, 500, "Something Went Wrong!");
		}

		return successResponse(res, 200, { token: otp.token });
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

exports.verifyOTP = async (req, res, next) => {
	try {
		const { code, token } = req.body;

		const otp = await authService.findOtp(token);
		if (!otp) {
			return errorResponse(res, 404, "توکن اشتباه میباشد");
		}

		if (otp.attempts === 2) {
			await authService.removeOtp(token);
			return errorResponse(
				res,
				400,
				"شما بیش از حد مجاز تلاش کردید، لطفا دوباره کد را دریافت کنید"
			);
		}

		if (+code !== otp.code) {
			const newOtp = await authService.increseOtpAttempt(token);
			return errorResponse(
				res,
				400,
				`کد وارد شده اشتباه است(${3 - newOtp.attempts} تلاش باقی مانده)`
			);
		}

		const [accessToken, refreshToken] = await Promise.all([
			authService.createAccessToken(otp.email),
			authService.createRefreshToken(otp.email),
		]);

		authService.setRefreshTokenCookie(res, refreshToken);

		return successResponse(res, 200, { accessToken });
	} catch (err) {
		next(err);
	}
};
