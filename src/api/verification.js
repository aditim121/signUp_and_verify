const mongoQuery = require('../../mongoQuery/query2mongo');
const message = require('../utils/enum');
const randtoken = require('rand-token');

class verfication {
    verifyEmail(email, code) {
        let response = {};
        return new Promise((resolve, reject) => {
            let mongoD = new mongoQuery();
            let query = { 'email': email }
            mongoD.findOne('users', query, (err, result, data) => {
                if (err) {
                    //return err in failure handler
                    response.error = err;
                    response.code = 500;
                    response.message = message.SERVER_ERROR;
                    return this.failureHandler(response, reject)
                }
                if (result) {
                    if (data.vcode == code) {
                        return this.updateStatus(email, 'active', response, resolve);
                    } else {
                        //return err in failure handler
                        response.error = null;
                        response.code = 200;
                        response.message = message.VERIFICATION_LINK_FAILED
                        return this.failureHandler(response, reject)
                    }
                } else {
                    //return err in failure handler
                    response.error = null;
                    response.code = 404;
                    response.message = message.USER_NOT_FOUND_ERROR
                    return this.failureHandler(response, reject)
                }
            })
        })
    }

    updateStatus(email, status, response, resolve) {
        let tmpToken = randtoken.generate(30);
        let mongoD = new mongoQuery();
        let query = { 'email': email };
        let update = { 'vcode': tmpToken, 'status': status }
        mongoD.updateOne('users', query, update, true, false, null, (err, result, data) => {
            if (err) {
                //return err in failure handler
                response.error = err;
                response.code = 500;
                response.message = message.SERVER_ERROR;
                return this.failureHandler(response, reject)
            }
            if(result) {
                response.result = 'Success'
                response.code = 200;
                response.message = message.VERIFICATION_SUCCESSFULL;
                return resolve(response)
            }
        })
    }

    failureHandler(response, reject) {
        response.responseTimestamp = new Date();
        response.result = 'Failed';
        return reject(response);
    }
}

module.exports = new verfication();