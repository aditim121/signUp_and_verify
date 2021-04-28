const mongoQuery = require('../../mongoQuery/query2mongo');
const message = require('../utils/enum');
const bcrypt = require("bcryptjs");
const encryptDecrypt = require('../../config/encryptionDecryption/encodeDecode');

class loginUser {

    constructor(body, headers) {
        this.body = body;
        this.headers = headers
    }

    login(){
        let response = {};
        let registerBody = this.body;
        return new Promise((resolve, reject) => {
            let query = { "email": registerBody.email };
            let passwd = registerBody.password
            let mongoD = new mongoQuery();
            mongoD.findOne('users', query, async (err, result, data) => {
                if (err) {
                    response.message = message.SERVER_ERROR;
                    response.code = 500;
                    response.error = err;
                    return this.failureHandler(response, reject)
                }
                if (result) {
                    if(data.status == "inactive"){
                        response.message = message.EMAIL_NOT_VERIFIED;
                        response.code = 200;
                        response.result = "Success"
                    }else if(data.status == "active"){
                        const isMatch = await bcrypt.compare(passwd, data.password);
                        if (isMatch) {
                            response.message = message.LOGIN_SUCCESSFUL;
                            response.code = 200;
                            response.result = "Success"
                        }
                        else{
                            response.message = message.INCORRECT_PASSWORD;
                            response.code = 200;
                            response.result = "Success"
                        }
                    }else{
                        response.message = message.USER_NOT_FOUND_ERROR;
                        response.code = 200;
                        response.result = "Success"
                    }
                    return resolve(response);
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

module.exports = loginUser;