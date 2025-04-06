const MarketDataModel = require("../../models/MarketData");
const axios = require("axios");

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
							price: coin.current_price,
							marketCap: coin.market_cap,
							marketCapRank: coin.market_cap_rank,
							volume24h: coin.total_volume,
							circulatingSupply: coin.circulating_supply,
							priceChange24h: coin.price_change_24h,
							priceChangePercentage24h:
								coin.price_change_percentage_24h,
							ath: coin.ath,
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
