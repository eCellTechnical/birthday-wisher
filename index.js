const express = require("express");
const app = express();

require("dotenv").config();

const { NODE_ENV, PORT } = require("./config/secret");

(async () => {
	try {
		await app.listen(PORT);
		console.info(
			`NODE_ENV: ${NODE_ENV}\nServer is up and running on Port ${PORT}`
		);
	} catch (err) {
		console.info("Error in running server.", err);
	}
})();