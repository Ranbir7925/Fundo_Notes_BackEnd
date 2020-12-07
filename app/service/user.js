const userModel = require('../model/user')
const bcrypt = require('bcrypt')

class UserService {
    registerUser = (data, callback) => {
        let salt = 10
        bcrypt.hash(data.password, salt, (_err,hash) => {
            var user = {
                firstName: data.firstName,
                lastName: data.lastName,
                emailId: data.emailId,
                password: hash,
            }
            console.log(user);
            userModel.registerUser(user, (err, result) => {
                err ? callback(err, null) : callback(null, result)
            })
        })
    }

    findAllUser = (data, callback) => {
        userModel.findAll(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }

    loginUser = (data, callback) => {
        userModel.loginUser(data, (err, result) => {
            if (err) {
                callback(err, null)
            } else {
                bcrypt.compare(data.password, result.password, (err, isMatch) => {
                    if (err) {
                        callback(err, null)
                    }
                    else if (!isMatch) {
                        callback('Password not matched')
                    }
                    else {
                        callback(null, result)
                    }
                })
            }
        })
    }
}

module.exports = new UserService()