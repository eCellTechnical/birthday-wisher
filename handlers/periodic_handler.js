const cron = require("node-cron");
const axios = require("axios");
const { NODE_ENV } = require("../config/secret");
const time = NODE_ENV === "development" ? "*/1 * * * *" : "0 0 * * *"; // everyday 0:0:0
const scheduled = true,
	timezone = "Asia/Kolkata";

const tickFunction = async () => {
	console.log("Tick");
	const data = await require("../database");
	let today = new Date();
	await data.forEach(async item => {
		//console.log(item);
		let dob = new Date(item.date_of_birth);
		// console.log('dob',dob.getMonth());
		// console.log('today',today.getMonth());
		if (
			dob.getDate() === today.getDate() &&
			dob.getMonth() === today.getMonth()
		) {
			console.log("Birthday", item.name);
			//console.log(data);
		} else {
			console.log("Not Birthday", item.name);
		}
	});
};

cron.schedule(time, tickFunction, { scheduled, timezone });
