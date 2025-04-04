const cron = require("node-cron");

// # ┌────────────── second
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *
cron.schedule("*/3 * * * * *", () => {
	try {
	} catch (err) {
		console.error("Error:", err.message);
	}
});
