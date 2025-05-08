const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		email: String,
		code: Number,
		userAttempts: {
			type: Number,
			default: 0, // max is 3
		},
		expiresAt: {
			type: Number,
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

const model = mongoose.model("otp", schema);

module.exports = model;
