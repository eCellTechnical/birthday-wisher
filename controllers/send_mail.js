var fs = require("fs");
var nodemailer = require("nodemailer");
var ejs = require("ejs");
const path = require("path");
const { EMAIL_ACC, EMAIL_PASS } = require("../config/secret");

let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	requireTLS: true,
	auth: {
		user: EMAIL_ACC,
		pass: EMAIL_PASS
	}
});
exports.sendEmailToIndividual = async (req, res) => {
	console.log(req.body);
	ejs.renderFile(
		path.join(__dirname, "/mail_template/birthday_mail.ejs"),
		{
			name: req.body.name
		},
		(err, data) => {
			if (err) {
				return res.status(500).json({
					success: false,
					message: "Email not sent error rendering ejs",
					error: err
				});
			}
			let mailOptions = {
				from: "ecellwebtechnical@gmail.com",
				to: req.body.email,
				subject: "Test",
				html: data
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return res.status(500).json({
						success: false,
						message: "Email not sent",
						error: error
					});
				}
				return res.status(200).json({
					success: true,
					message: "Email sent successfully"
				});
			});
		}
	);
};
exports.sendEmailToEcell = async (req, res) => {
	ejs.renderFile(
		path.join(__dirname, "/mail_template/inform_mail.ejs"),
		{
			name: req.body.name
		},
		(err, data) => {
			if (err) {
				return res.status(500).json({
					success: false,
					message:
						"Email not sent error rendering ejs of inform mail",
					error: err
				});
			}
			let mailOptions = {
				from: "ecellwebtechnical@gmail.com",
				to: "ecell@kiet.edu",
				subject: "Test: Birthday Alert",
				html: data
			};

			transporter.sendMail(mailOptions, (error, _info) => {
				if (error) {
					return res.status(500).json({
						success: false,
						message: "Email not sent",
						error: error
					});
				}
				return res.status(200).json({
					success: true,
					message: "Email sent successfully"
				});
			});
		}
	);
};
