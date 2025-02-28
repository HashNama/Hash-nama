const UserModel = require("./../../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const configs = require("./../../configs");

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

exports.createAccessToken = (userId) => {
	const accessToken = jwt.sign(
		{ userId },
		configs.auth.accessTokenSecretKey,
		{ expiresIn: configs.auth.accessTokenExpriesInSeconds }
	);

	return accessToken;
};

exports.createRefreshToken = (userId) => {
	const refreshToken = jwt.sign(
		{ userId },
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
				return { error: true, redirectTo: "/login" };
			}
			return decoded;
		}
	);
	return decoded;
};
