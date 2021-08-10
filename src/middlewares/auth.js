const Token = require('../libraries/token');

/**
 * 
 * @param {} headers ['authorization'] 
 * @returns boolean
 */

const hasHeaderAuthorization = (headers) => {
    return headers && headers['authorization'];
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns next or response failed
 */
const validateToken = (req, res, next) => {
    try {
        if (hasHeaderAuthorization(req.headers)) {
            Token.setToken = req.headers['authorization'];
            req.user = Token.decoded();
            return next();
        }

        res.status(403).send({
            message: 'Unauthorized',
            data: error.toString(),
        });
    } catch (error) {
        res.status(403).send({
            message: 'Unauthorized',
            data: error.toString(),
        });
    }
};

module.exports = {
    hasHeaderAuthorization,
    validateToken
};
