const express = require("express");
const app = express();

require("dotenv").config();

const { NODE_ENV, PORT } = require("./config/secret");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/send", require("./routes/send_mail"));
app.set("view engine", "ejs");

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
