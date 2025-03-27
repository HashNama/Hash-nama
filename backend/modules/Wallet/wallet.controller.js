const { errorResponse, successResponse } = require("../../helpers/responses");
const walletService = require("./wallet.service");
const ethers = require("ethers");
const axios = require("axios");
const config = require("./../../configs");
const { formatNumber } = require("./../../utils/formatNumber");
const { formatNumber } = require("../../utils/formatNumber");

exports.addWallet = async (req, res, next) => {
	try {
		const { address } = req.body;
		const user = req.user;

		const isValidAddress = ethers.isAddress(address);
		if (!isValidAddress) {
			return errorResponse(res, 400, "آدرس وارد شده معتبر نمیباشد");
		}
		await Promise.all([
			walletService.isWalletExistsInUserAccount(user._id, address),
			walletService.addWallet(user._id, address),
		]);

		return successResponse(res, 201, { message: "ولت با موفقیت اضافه شد" });
	} catch (err) {
		next(err);
	}
};

exports.getWalletAssets = async (req, res, next) => {
	try {
		const chains = ["eth", "base", "bsc", "polygon"];
		const { address } = req.body;

		//* Get Assets
		let portfolio = {};
		let trashAssetsCount = 0;
		let totalNetWorth = 0;
		let chainNetWorth = 0;

		for (const chain of chains) {
			chainNetWorth = 0;
			const response = await axios.get(
				`https://deep-index.moralis.io/api/v2.2/wallets/${address}/tokens`,
				{
					params: {
						chain,
						include: "native",
					},
					headers: {
						"X-API-Key": config.apiKeys.moralis,
					},
				}
			);
			const chainAssets = response.data.result;

			const filteredAssets = chainAssets.reduce((acc, asset) => {
				//* check valid assets
				if (!asset.possible_spam && asset.verified_contract) {
					acc.push({
						symbol: asset.symbol,
						name: asset.name,
						logo: asset.logo,
						securityScore: asset.security_score,
						balance: formatNumber(asset.balance_formatted),
						price: formatNumber(asset.usd_price, "currency"),
						price24HourPercentChange: formatNumber(
							asset.usd_price_24hr_percent_change
						),
						usdAmount: formatNumber(
							asset.balance_formatted * asset.usd_price,
							"currency"
						),
						ofPortfolioPercentage: formatNumber(
							asset.portfolio_percentage
						),
					});
					totalNetWorth =
						totalNetWorth +
						asset.balance_formatted * asset.usd_price;
					chainNetWorth =
						chainNetWorth +
						asset.balance_formatted * asset.usd_price;
				} else {
					trashAssetsCount++;
				}
				return acc;
			}, []);

			portfolio[chain] = { assets: filteredAssets, chainNetWorth };
		}

		return successResponse(res, 200, {
			address,
			totalNetWorth,
			trashAssetsCount,
			portfolio,
		});
	} catch (err) {
		next(err);
	}
};
