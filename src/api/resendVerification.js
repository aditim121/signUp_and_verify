const mongoQuery = require('../../mongoQuery/query2mongo');
const message = require('../utils/enum');
const randtoken = require('rand-token');
const sendEmail = require('../utils/send_email');

class resendLink {

    constructor(body, headers) {
        this.body = body;
        this.headers = headers
    }

    resend() {
        let response = {};
        let registerBody = this.body;
        let query = {"email": registerBody.email};
        let mongoD = new mongoQuery();
        return new Promise((resolve, reject) => {
            mongoD.findOne('users', query, async (err, result, data) => {
                if (err) {
                    response.message = message.SERVER_ERROR;
                    response.code = 500;
                    response.error = err;
                    return this.failureHandler(response, reject)
                }
                if (result) {
                    let tmpToken = randtoken.generate(30);
                    let newvalues = { $set: {vcode: tmpToken } };

                    mongoD.updateOne('users', query, newvalues, "Updated", true, [],function(err, res){
                        if (err) {
                            response.message = err.message;
                            response.code = 404;
                            return this.failureHandler(response, reject)
                        }
                        if(res){
                            let registerEmail = new sendEmail(registerBody.email, 'accountActivation', tmpToken)
                            registerEmail.email()
                                .then(sent => {
                                    sent.message = message.SUCCESSFULL_REGISTRATION;
                                    return resolve(sent)
                                })
                                .catch(sentErr => {
                                    return reject(sentErr)
                                })
                        }
                    })
                }else{
                    response.message = message.USER_NOT_FOUND_ERROR;
                    response.code = 200;
                    response.result = "Success"
                    return resolve(response);
                }

            })
        })
    }
    failureHandler(response, reject) {
        response.responseTimestamp = new Date();
        response.result = 'Failed';
        return reject(response);
    }
}

module.exports = resendLink;