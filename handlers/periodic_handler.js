const cron = require("node-cron");
const axios = require("axios");
const { NODE_ENV, URL } = require("../config/secret");
const {
	sendEmailToIndividual,
	sendEmailToEcell
} = require("../controllers/send_mail");
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
			// await axios({
			//     method: 'post',
			//     url: URL + "/send/individual",
			//     data: {
			//       email: item.email,
			//       name: item.name,
			//     },
			//     headers: {
			//         'content-type': 'application/json'
			//     }
			//   });
			await sendEmailToIndividual({
				email: item.email,
				name: item.name
			});
			await sendEmailToEcell({
				name: item.name
			});
			console.log("Birthday", item.name);
			//console.log(data);
		} else {
			console.log("Not Birthday", item.name);
		}
	});
};

cron.schedule(time, tickFunction, { scheduled, timezone });
