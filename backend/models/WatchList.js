const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		coinId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Coin",
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

const model = mongoose.model("WatchList", watchListSchema);

module.exports = model;
