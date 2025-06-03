const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		token: {
			type: String,
			required: true,
		},
		code: {
			type: Number,
			required: true,
		},
		attempts: {
			type: Number,
			default: 0, // max is 3
		},
		expiresAt: {
			type: Date,
			required: true,
			default: () => new Date(Date.now() + 3 * 60 * 1000),
		},
	},
	{
		versionKey: false,
	}
);

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const model = mongoose.model("otp", schema);

module.exports = model;
