const express = require("express");
const cors = require("cors");
const path = require("path");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

//* BodyParser
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
//* CORS Policy
app.use(cors());

//* Static Folder
app.use(express.static(path.join(__dirname, "public")));

//* Routes

//* Error
app.use((req, res) => {
	return res.status(404).json({ msg: "Not Found Path" });
});

app.use(errorHandler);

module.exports = app;
