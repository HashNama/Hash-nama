const { isValidObjectId } = require("mongoose");
const MarketDataModel = require("../../models/MarketData");
const axios = require("axios");

const normalizeSymbol = (symbol) => symbol.trim().toUpperCase();
let fetchCounter = 0;
const storeCoinPrice = (coin) => {
	if (fetchCounter === 240) {
		return { price: coin.current_price, createdAt: new Date() };
	}
	return;
};
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
		fetchCounter++;

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
						$push: {
							historicalPrices: storeCoinPrice(coin),
						},
					},
					upsert: true,
				},
			};
		});

		await MarketDataModel.bulkWrite(updates);

		const top100Symbols = data.map((coin) => coin.symbol.toUpperCase());
		await MarketDataModel.deleteMany({ symbol: { $nin: top100Symbols } });

		fetchCounter = fetchCounter === 240 ? 0 : fetchCounter;
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

exports.getCoinPrice = async (coinId) => {
	const price = await MarketDataModel.findOne({ _id: coinId }).select(
		"price"
	);
	return price;
};

exports.isCoinExists = async (coinId) => {
	if (!isValidObjectId(coinId)) {
		throw { status: 400, message: "آیدی کوین معتبر نمیباشد!" };
	}

	const coin = await MarketDataModel.findById(coinId);

	return coin ? true : false;
};
