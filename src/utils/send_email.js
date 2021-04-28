let Transporter = require('../../config/mail');
let keys = require('../../config/keys');

class sendEmail {
    constructor(reciever, type, token) {
        this.reciever = reciever;
        this.type = type;
        this.token = token
    }

    email() {

        return new Promise((resolve, reject) => {
            let emailContent = require(`../emailTemplate/${this.type}`)
            let response = {};
            let link = emailContent.body + `?email=` + this.reciever + `&code=` + this.token
            let mailOpts = {
                from: keys.mailer.user,
                to: this.reciever,
                subject: emailContent.subject,
                html: `<a href=${link}>Click here to activate</a>`
            };
            Transporter.sendMail(mailOpts, function (error, info) {
                if (error) {
                    response.error = error;
                    response.responseTimestamp = new Date();
                    response.result = 'Failed';
                    return reject(response);
                }
                else {
                    response.result = 'Success';
                    response.code = 201;
                    response.vlink = link
                    return resolve(response)
                }
            });
        })
    }
    send() {
        return new Promise((resolve, reject) => {
            let emailContent = require(`../emailTemplate/${this.type}`)
            let response = {};
            let link = emailContent.bodyUpdatePass + `?email=` + this.reciever + `&code=` + this.token
            let mailOpts = {
                from: keys.mailer.user,
                to: this.reciever,
                subject: emailContent.subjectUpdatePass,
                html: `<a href=${link}>Click here to update your password</a>`
            };
            Transporter.sendMail(mailOpts, function (error, info) {
                if (error) {
                    response.error = error;
                    response.responseTimestamp = new Date();
                    response.result = 'Failed';
                    return reject(response);
                }
                else {
                    response.result = 'Success';
                    response.code = 201;
                    return resolve(response)
                }
            });
        })
    }

    failureHandler(response, reject) {
        response.responseTimestamp = new Date();
        response.result = 'Failed';
        return reject(response);
    }

}

module.exports = sendEmail;