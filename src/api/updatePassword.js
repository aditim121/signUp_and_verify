const mongoQuery = require('../../mongoQuery/query2mongo');
const message = require('../utils/enum');
const bcrypt = require("bcryptjs");
const encryptDecrypt = require('../../config/encryptionDecryption/encodeDecode');
const randtoken = require('rand-token');
const User = require('../models/users');

class updatePassword {

    constructor(body, headers) {
        this.body = body;
        this.headers = headers
    }
    update(){
        let response = {};
        let registerBody = this.body;
        return new Promise((resolve, reject) => {
            let query = {"email": registerBody.email};
            let passwd = registerBody.password
            let mongoD = new mongoQuery();
            mongoD.findOne('users', query, async (err, result, data) => {
                if (err) {
                    response.message = message.SERVER_ERROR;
                    response.code = 500;
                    response.error = err;
                    return this.failureHandler(response, reject)
                }
                if(result){
                    const salt = await bcrypt.genSalt(10);
                    let newPassword = await bcrypt.hash(registerBody.password.toString(), salt);

                    let newvalues = { $set: {password: newPassword } };
                    mongoD.updateOne('users', query, newvalues, "Updated", true, [],function(err, res){
                        if (err) {
                            response.message = err.message;
                            response.code = 404;
                            return this.failureHandler(response, reject)
                        }
                        if(res){
                            response.message = message.PASSWORD_UPDATED;
                            response.code = 200;
                            response.result = "Success"
                            return resolve(response);
                        }
                    })
                } else{
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

module.exports = updatePassword;