const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		coinId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Coin",
		},
		price: {
			type: Number,
			required: true,
		},
		marketCap: {
			type: Number,
			required: false,
			default: null,
		},
		volume: {
			type: Number,
			required: false,
			default: null,
		},
		circulatingSupply: {
			type: Number,
			required: false,
			default: null,
		},
		updatedAt: {
			type: Date.now(),
		},
	},
	{
		versionKey: false,
	}
);

const model = mongoose.model("MarketData", schema);

module.exports = model;
