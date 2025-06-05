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
		const email = decodedToken.email;

		const user = await authService.findUserByEmail(email);

		req.user = user;
		next();
	} catch (error) {
		errorResponse(res, 401, error.message);
	}
};
