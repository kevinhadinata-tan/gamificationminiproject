const CryptoJS = require('crypto-js');
const moment = require('moment');

const SECRET = 'i#]N[WtiqAo1&f4ResFj+GDHx(EhsM';

class Password {
    static makePassword(stringPassword) {
        const password = CryptoJS.AES.encrypt(stringPassword, SECRET);
        return password.toString();
    }
    static matchPassword(stringPassword, encryptedPassword) {
        const decrypted = CryptoJS.AES.decrypt(encryptedPassword, SECRET);
        return stringPassword === decrypted.toString(CryptoJS.enc.Utf8);
    }
    static generateCsrf() {
        const token = `${moment().toDate().toString()}${SECRET}`;
        return CryptoJS.AES.encrypt(token, SECRET).toString();
    }
}

module.exports = Password;