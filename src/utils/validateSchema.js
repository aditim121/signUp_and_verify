let Ajv = require('ajv');

class validateSchema {
    constructor() {
    }

    validate(order, schema) {
        let ajv = new Ajv({ allErrors: true, jsonPointers: true, removeAdditional: true });
        require('ajv-errors')(ajv);
        let validate = ajv.compile(schema);
        validate(order);
        return validate.errors;
    }
}

module.exports = validateSchema;
