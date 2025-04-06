const cron = require("node-cron");
const marketService = require("../Market/market.service");

// # ┌────────────── second
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
cron.schedule("*/30 * * * * *", async () => {
	try {
		await marketService.syncTop100Coins();
		console.log("Market Updated Successfully");
	} catch (err) {
		console.error("Error:", err.message);
	}
});
