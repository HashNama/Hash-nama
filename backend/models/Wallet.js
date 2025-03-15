const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		wallet: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamp: true }
);

const model = mongoose.model("Wallet", walletSchema);

module.exports = model;
