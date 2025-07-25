const {
	registerValidator,
	loginValidator,
	recoveryPaasswordValidator,
} = require("./auth.validators");
const authService = require("./auth.service");
const { successResponse, errorResponse } = require("../../helpers/responses");
const {
	sendOtpEmail,
	sendRecoveryPasswordEmail,
} = require("./../../utils/email");
const configs = require("../../configs");

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

exports.generatePasswordRecoveryLink = async (req, res, next) => {
	try {
		const { email } = req.body;

		await authService.findUserByEmail(email); // USE AS A IS-EXISTS FUNCTION

		const isExistRecovery = await authService.findRecovery(email);
		if (isExistRecovery) {
			return errorResponse(
				res,
				400,
				"شما درخواست ریکاوری داده اید. لطفا ایمیل خود را چک کرده. در صورت عدم دریافت ایمیل،5 دقیقه دیگر تلاش کنید"
			);
		}

		const recovery = await authService.createRecovery(email);
		if (!recovery) {
			return errorResponse(res, 500, "Something Went Wrong!!");
		}

		const isSent = await sendRecoveryPasswordEmail(
			email,
			`${configs.domain}/api/auth/recovery?token=${recovery.token}`
		);
		if (!isSent) {
			return errorResponse(res, 500, "Something Went Wrong!!");
		}

		return successResponse(res, 200, { msg: "email sent successfully" });
	} catch (err) {
		next(err);
	}
};

exports.confirmPasswordRecovery = async (req, res, next) => {
	try {
		const { token } = req.query;
		const { newPassword } = req.body;

		const recovery = await authService.findRecovery(token);
		if (!recovery) {
			return errorResponse(res, 404, "invalid token");
		}

		await recoveryPaasswordValidator.validate(
			{ password: newPassword },
			{ abortEarly: false }
		);

		const hashedPassword = await authService.hashPassword(newPassword);

		const updatedUser = await authService.updateUser(
			{ email: recovery.email },
			{ password: hashedPassword }
		);

		if (!updatedUser) {
			return errorResponse(res, 500, "Something WEnt Wrong!");
		}

		await authService.deleteRecovery(token);

		return successResponse(res, 200, {
			msg: "رمزعبور با موفقیت تغییر یافت",
		});
	} catch (err) {
		next(err);
	}
};
