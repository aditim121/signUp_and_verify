const mongoQuery = require('../../mongoQuery/query2mongo');
const message = require('../utils/enum');

class removeEmail {

    constructor(body, headers) {
        this.body = body;
        this.headers = headers
    }

    remove() {
        let response = {};
        let registerBody = this.body;
        return new Promise((resolve, reject) => {
            let query = { "email": registerBody.email };
            let mongoD = new mongoQuery();
            mongoD.deleteOne('users', query, async (err, result, data) => {
                if (err) {
                    response.message = message.SERVER_ERROR;
                    response.code = 500;
                    response.error = err;
                    return this.failureHandler(response, reject)
                }
                if (result) {
                    response.message = message.EMAIL_REMOVED;
                    response.code = 200;
                    response.result = "Success"
                    return resolve(response);
                }else {
                    //return err in failure handler
                    response.error = null;
                    response.code = 404;
                    response.message = message.USER_NOT_FOUND_ERROR
                    return this.failureHandler(response, reject)
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

module.exports = removeEmail;