module.exports = {
	db: {
		URI: process.env.DB_URI,
	},

	port: process.env.PORT || 4000,

	auth: {
		accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
		refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
		accessTokenExpriesInSeconds:
			process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS,
		refreshTokenExpriesInSeconds:
			process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS,
	},

	session: {
		sessionSecretKey: process.env.SESSION_SECRET_KEY,
	},

	apiKeys: {
		moralis: process.env.MORALIS_API_KEY,
	},

	email: {
		user: process.env.EMAIL_USERNAME,
		pass: process.env.EMAIL_PASSWORD,
	},

	domain: process.env.DOMAIN,

	isProduction: process.env.NODE_ENV === "production",
};
