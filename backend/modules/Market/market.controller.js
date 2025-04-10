const { successResponse } = require("../../helpers/responses");
const marketService = require("./market.service");

exports.getMarket = async (req, res, next) => {
	try {
		const market = await marketService.getMarketData();
		return successResponse(res, 200, { market });
	} catch (err) {
		next(err);
	}
};
