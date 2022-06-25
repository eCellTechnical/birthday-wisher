const {
	sendEmailToIndividual,
	sendEmailToEcell
} = require("../controllers/send_mail");

const router = require("express").Router();

router.get("/individual", sendEmailToIndividual);
router.get("/ecell", sendEmailToEcell);

module.exports = router;
