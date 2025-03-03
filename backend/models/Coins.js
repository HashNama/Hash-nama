const mongoose = require("mongoose");

const coinSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		symbol: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

const model = mongoose.model("Coin", coinSchema);

module.exports = model;
