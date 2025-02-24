require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const configs = require("./configs");

//* connect to db
async function connectToDB() {
	try {
		await mongoose.connect(configs.db.URI);
		console.log(`connected to database: ${mongoose.connection.host}`);
	} catch (err) {
		console.log(`db connection error: ${err}`);
		process.exit(1);
	}
}
//* start server
function startServer() {
	const port = +process.env.PORT || 4000;
	app.listen(port, () => {
		console.log(
			`listening to port ${port} || mode: ${process.env.NODE_ENV}`
		);
	});
}

async function run() {
	startServer();
	await connectToDB();
}

run();
