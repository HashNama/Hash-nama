exports.formatNumber = (number, style) => {
	return new Intl.NumberFormat("en-US", {
		style,
		currency: style === "currency" ? "USD" : undefined,
		minimumFractionDigits: number < 1 ? 2 : 0,
		maximumFractionDigits: number < 0.01 ? 8 : 2,
	}).format(number);
};
