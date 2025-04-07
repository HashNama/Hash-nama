const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		symbol: {
			type: String,
			required: true,
			uppercase: true,
			trim: true,
		},
		image: {
			type: String,
			required: true,
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
		marketCapRank: {
			type: Number,
			required: false,
			default: null,
		},
		volume24h: {
			type: Number,
			required: false,
			default: null,
		},
		circulatingSupply: {
			type: Number,
			required: false,
			default: null,
		},
		priceChange24h: {
			type: Number,
			required: false,
			default: null,
		},
		priceChangePercentage24h: {
			type: Number,
			required: false,
			default: null,
		},
		ath: {
			type: Number,
			required: false,
			default: null,
		},
		updatedAt: {
			type: Date,
		},
	},
	{
		versionKey: false,
	}
);

const model = mongoose.model("MarketData", schema);

module.exports = model;
