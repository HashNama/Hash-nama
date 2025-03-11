const express = require("express");
const cors = require("cors");
const path = require("path");
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/Auth/auth.routes");
const coinRoutes = require("./modules/Coin/coin.routes");
const watchListRoutes = require("./modules/WatchList/watchList.routes");

const apiDocRoutes = require("./modules/ApiDoc/swagger.routes");

const app = express();

//* BodyParser
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//* Cookie Parser
app.use(cookieParser());

//* CORS Policy
app.use(cors());

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use("/api/auth/", authRoutes);
app.use("/api/coin/", coinRoutes);
app.use("/api/watchlist/", watchListRoutes);

app.use("/api-doc", apiDocRoutes);
//* Error
app.use((req, res) => {
	return res.status(404).json({ msg: "Not Found Path" });
});

app.use(errorHandler);

module.exports = app;
