const mongoose = require("mongoose");

const schema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			min: 3,
			max: 36,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			required: true,
			enum: ["USER", "ADMIN"],
		},
	},
	{ timestamps: true, versionKey: false }
);

const model = mongoose.model("User", schema);

module.exports = model;
