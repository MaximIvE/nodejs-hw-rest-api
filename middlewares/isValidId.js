const { isValidObjectId } = require('mongoose');

const {requestError} = require('../helpers')

const isValidId = (req, res, next) => {
    const { Id } = req.params;
    const result = isValidObjectId(Id);
    if (!result) {
        next(requestError(400, "Invalid id format"))
    }
    next()
}

module.exports = isValidId