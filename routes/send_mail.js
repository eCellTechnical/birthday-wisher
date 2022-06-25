const {
	sendEmailToIndividual,
	sendEmailToEcell
} = require("../controllers/send_mail");

const router = require("express").Router();

router.post("/individual", sendEmailToIndividual);
router.post("/ecell", sendEmailToEcell);

module.exports = router;
