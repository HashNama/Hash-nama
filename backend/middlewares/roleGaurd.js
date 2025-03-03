const jwt = require("jsonwebtoken");
const authService = require("../modules/Auth/auth.service");
const configs = require("../configs");
const { errorResponse } = require("../helpers/responses");

module.exports = (role) => {
	return (req, res, next) => {
		try {
			const token = req.headers.authorization.split(" ")[1];
			console.log(token);

			const decodedToken = jwt.verify(
				token,
				"mdJHga12g13gfhjy1yg3adD12Gde45"
			);
			console.log(decodedToken);
			const userId = decodedToken.userId;

			authService
				.findUserById(userId)
				.then((user) => {
					if (user.role !== role) {
						return res.status(403).json({
							message:
								"دسترسی به این روت برای شما امکان پذیر نمیباشد",
						});
					}
					req.user = user;
					next();
				})
				.catch((err) => {
					return res
						.status(500)
						.json({ message: "Internal Server Error" });
				});
		} catch (err) {
			return errorResponse(
				res,
				400,
				"توکن یا اطلاعات موجود در آن نامعتبر است"
			);
		}
	};
};
