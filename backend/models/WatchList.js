const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		coin: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MarketData",
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

const model = mongoose.model("WatchList", watchListSchema);

module.exports = model;
