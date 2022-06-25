require("dotenv").config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	EMAIL_ACC: process.env.EMAIL_ACC,
	EMAIL_PASS: process.env.EMAIL_PASS,
	URL: process.env.URL
};
