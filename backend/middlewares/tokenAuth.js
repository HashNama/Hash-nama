const jwt = require("jsonwebtoken");
const authService = require("../modules/Auth/auth.service");
const configs = require("../configs");
const { errorResponse } = require("../helpers/responses");

module.exports = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const decodedToken = jwt.verify(
			token,
			configs.auth.accessTokenSecretKey
		);
		const userId = decodedToken.userId;

		const user = await authService.findUserById(userId);

		req.user = user;
		next();
	} catch (error) {
		errorResponse(res, error);
	}
};
