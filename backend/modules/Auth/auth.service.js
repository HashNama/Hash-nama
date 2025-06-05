const UserModel = require("./../../models/User");
const OtpModel = require("./../../models/Otp");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("./../../configs");
const { isValidObjectId } = require("mongoose");

exports.findUserByEmail = async (email) => {
	const user = await UserModel.findById(email);
	if (!user) throw { status: 404, message: "کاربر یافت نشد" };

	return user;
};

exports.usernameExists = async (username) => {
	const user = await UserModel.findOne({ username });
	if (user) throw { status: 400, message: "یوزرنیم ثبت شده است" };
	return;
};

exports.emailExists = async (email) => {
	const user = await UserModel.findOne({ email });
	if (user) throw { status: 400, message: "ایمیل ثبت شده است" };
	return;
};

exports.hashPassword = async (password) => {
	const salt = bcrypt.genSaltSync(8);
	const hashedPassword = bcrypt.hashSync(password, salt);

	return hashedPassword;
};

exports.isFirstUser = async () => {
	return (await UserModel.countDocuments()) === 0;
};

exports.createUserDocument = async (username, email, password) => {
	const isFirst = await this.isFirstUser();
	const user = await UserModel.create({
		username,
		email,
		password,
		role: isFirst ? "ADMIN" : "USER",
	});

	if (!user) throw { status: 500, message: "Something went wrong" };

	return user;
};

exports.createAccessToken = (email) => {
	const accessToken = jwt.sign({ email }, configs.auth.accessTokenSecretKey, {
		expiresIn: configs.auth.accessTokenExpriesInSeconds,
	});

	return accessToken;
};

exports.createRefreshToken = (email) => {
	const refreshToken = jwt.sign(
		{ email },
		configs.auth.refreshTokenSecretKey,
		{ expiresIn: configs.auth.refreshTokenExpriesInSeconds }
	);

	return refreshToken;
};

exports.setRefreshTokenCookie = (res, token) => {
	res.cookie("refreshToken", token, {
		httpOnly: true,
		sameSite: "Strict",
		secure: true,
	});
};

exports.findUserByEmail = async (email) => {
	const user = await UserModel.findOne({ email });
	if (!user) throw { status: 400, message: "ایمیل یا پسورد اشتباه است" };
	return user;
};

exports.compareWithHashedPassword = async (user, password) => {
	const passwordValidation = bcrypt.compareSync(password, user.password);
	if (!passwordValidation)
		throw { status: 400, message: "ایمیل یا پسورد اشتباه است" };
	return;
};

exports.verifyRefreshToken = async (refreshToken) => {
	const decoded = jwt.verify(
		refreshToken,
		configs.auth.refreshTokenSecretKey,
		(err, decoded) => {
			if (err) {
				throw { status: 401, message: "رفرش توکن معتبر نیست" };
			}
			return decoded;
		}
	);
	return decoded;
};

exports.createOTP = async (email) => {
	const token = crypto.randomUUID();
	const code = Math.floor(Math.random() * (99999 - 10000) + 10000);

	const otp = await OtpModel.create({ email, token, code });

	return otp;
};

exports.findOtp = async (token) => {
	const otp = await OtpModel.findOne({ token });
	return otp;
};

exports.removeOtp = async (token) => {
	await OtpModel.findOneAndDelete({ token });
	return;
};

exports.increseOtpAttempt = async (token) => {
	const newOtp = await OtpModel.findOneAndUpdate(
		{ token },
		{
			$inc: { attempts: 1 },
		},
		{ new: true }
	);

	return newOtp;
};
