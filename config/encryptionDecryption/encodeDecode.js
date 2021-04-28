const crypto = require('crypto');

class EncryptDecrypt {

    encrypt(publicKey,password) {
        let pub = publicKey;
        let pass = password;
        let secret = `${pub}+*${pass}`
        return secret;
    }

    decrypt(encryptPass) {
        let pub = this.publicKey;
        let pass = this.password;
        let secret = `${pub}+*${pass}`
        return this.valid(secret,pass,encryptPass);
    }

    setPassword(email,password) {
        let salt = this.encrypt(email,password);
        let hash = crypto.pbkdf2Sync(password,salt, 1000, 64, 'sha512').toString('hex');
        return hash;
    }

    valid(user,password) {
        let salt = this.encrypt(user.email,password);
        let hash = crypto.pbkdf2Sync(password,salt, 1000, 64, 'sha512').toString('hex');
        return user.password == hash;
    }
}

module.exports = new EncryptDecrypt();