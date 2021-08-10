const jwt = require('jsonwebtoken');

const SECRET = '9D9B9B6C11EEFE44FB138ED988A52';
const EXPIRES_IN = '1h'; // testing token

class Token {

    sign(data) {
        const token = jwt.sign(data, SECRET, {
            expiresIn: EXPIRES_IN,
        });

        return token;
    }

    decoded() {
        try {
            const decoded = jwt.verify(this._token, SECRET);
            return decoded;
        } catch (error) {
            throw new Error(error);
        }
    }

    set setToken(token) {
        this._token = token.split('Bearer ')[1].trim();
    }

    get getToken() {
        return this._token;
    }
}

module.exports = new Token();
