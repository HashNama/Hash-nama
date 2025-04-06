const mongoose = require("mongoose");

const schema = mongoose.Schema(
	{
		price: {
			type: Number,
			required: true,
		},
		position: {
			type: String,
			enum: ["below", "above"],
			required: true,
		},
		reached: {
			type: Boolean,
			default: false,
		},
		coinId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "MarketData",
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		versionKey: false,
		timestamp: true,
	}
);

const model = mongoose.model("Alert", schema);

module.exports = model;
