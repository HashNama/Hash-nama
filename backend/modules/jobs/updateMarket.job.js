const cron = require("node-cron");
const marketService = require("../Market/market.service");
const alertService = require("../Alert/alert.service");

// # ┌────────────── second
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
cron.schedule("*/15 * * * * *", async () => {
	try {
		await marketService.syncTop100Coins();
		await alertService.sendAlertNotification();
	} catch (err) {
		console.error("Error:", err.message);
	}
});
