const MarketDataModel = require("../../models/MarketData");
const axios = require("axios");
const { formatNumber } = require("./../../utils/formatNumber");

const normalizeSymbol = (symbol) => symbol.trim().toUpperCase();

exports.syncTop100Coins = async () => {
	try {
		const { data } = await axios.get(
			"https://api.coingecko.com/api/v3/coins/markets",
			{
				params: {
					vs_currency: "usd",
					order: "market_cap_desc",
					per_page: 100,
					page: 1,
				},
			}
		);

		const updates = data.map((coin) => {
			const normalizedSymbol = normalizeSymbol(coin.symbol);

			return {
				updateOne: {
					filter: { symbol: normalizedSymbol, name: coin.name },
					update: {
						$set: {
							name: coin.name,
							symbol: normalizedSymbol,
							image: coin.image,
							price: formatNumber(coin.current_price, "currency"),
							marketCap: formatNumber(coin.market_cap),
							marketCapRank: coin.market_cap_rank,
							volume24h: formatNumber(
								coin.total_volume,
								"currency"
							),
							circulatingSupply: formatNumber(
								coin.circulating_supply
							),
							priceChange24h: formatNumber(
								coin.price_change_24h,
								"currency"
							),
							priceChangePercentage24h: formatNumber(
								coin.price_change_percentage_24h
							),
							ath: formatNumber(coin.ath, "currency"),
							updatedAt: new Date(),
						},
					},
					upsert: true,
				},
			};
		});

		await MarketDataModel.bulkWrite(updates);

		const top100Symbols = data.map((coin) => coin.symbol.toUpperCase());
		await MarketDataModel.deleteMany({ symbol: { $nin: top100Symbols } });

		return;
	} catch (err) {
		console.log(err.message);
		throw { status: 500, message: "Something Went Wrong!!!" };
	}
};

exports.getMarketData = async () => {
	const market = await MarketDataModel.find({}).lean();
	if (!market) {
		throw { status: 500, message: "Something Went Wrong" };
	}
	return market;
};
