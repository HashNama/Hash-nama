const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		},
		expiresAt: {
			type: Date,
			required: true,
			default: () => new Date(Date.now() + 5 * 60 * 1000),
		},
	},
	{
		versionKey: false,
	}
);

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const model = mongoose.model("otp", schema);

module.exports = model;
