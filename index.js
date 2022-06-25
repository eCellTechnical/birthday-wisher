const express = require("express");
const app = express();

require("dotenv").config();

const { NODE_ENV, PORT } = require("./config/secret");

app.get("/", (req, res) => {
	return res.status(200).json({
		success: true,
		message: "Welcome to the API"
	});
});

app.listen(PORT, () => {
	console.log(
		`Server is running on port ${PORT} 🚀`,
		`\nIn ${NODE_ENV} mode`
	);
});
