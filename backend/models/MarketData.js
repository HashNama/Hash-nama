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
			type: String,
			required: true,
		},
		marketCap: {
			type: String,
			required: false,
			default: null,
		},
		marketCapRank: {
			type: Number,
			required: false,
			default: null,
		},
		volume24h: {
			type: String,
			required: false,
			default: null,
		},
		circulatingSupply: {
			type: String,
			required: false,
			default: null,
		},
		priceChange24h: {
			type: String,
			required: false,
			default: null,
		},
		priceChangePercentage24h: {
			type: String,
			required: false,
			default: null,
		},
		ath: {
			type: String,
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
