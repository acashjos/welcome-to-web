
const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err)
                return reject(err);
            resolve(hash);
        });
    })
}

exports.comparePassword = async (passwordToCheck, hashInRecord) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passwordToCheck, hashInRecord, function (err, match) {
            if (err)
                return reject(err);
            resolve(match);
        });
    })
}