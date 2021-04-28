const Mailer = require('nodemailer');
const keys = require('./keys');

let transporter = Mailer.createTransport({
	host: keys.mailer.service,
	secure: false,
	auth: {
		user: keys.mailer.user,
		pass: keys.mailer.pass
	}
});

module.exports = transporter;