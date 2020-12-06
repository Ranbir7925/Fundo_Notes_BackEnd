const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        min: 3,
        required: true
    },
    lastName: {
        type: String,
        min: 3,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

var User = mongoose.model("User", userSchema)

class UserModel {
    create = (data, callback) => {
        try {
            const user = new User({
                firstName: data.firstName,
                lastName: data.lastName,
                emailId: data.emailId,
                password: data.password
            })
            user.save()
            callback(null, user)
        } catch (error) {
            callback(error, null)
        }
    }

    findAll = (data, callback) => {
        User.find(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }

    findOne = (userId, callback) => {
        User.findById(userId, (err, result) => {
            err ? callback(err, null) : callback(null, result)

        })
    }

    updateUser = (userId, data, callback) => {
        User.findByIdAndUpdate(userId, data, (err) => {
            err ? callback(err, null) : callback(null, data)
        })
    }

    deleteUser = (userId, callback) => {
        User.findByIdAndDelete(userId, (err, data) => {
            err ? callback(err, null) : callback(null, data)
        })
    }

    loginUser = (data, callback) => {
        User.findOne({ emailId: data.emailId }, (err, result) => {
            if (err) {
                callback(err, null)
            }
            else if (result != null) {
                if (data.password == result.password) {
                    let resutlData = {
                        id: result._id,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        emailId: result.emailId
                    }
                    callback(null, resutlData)
                } else {
                    callback("Password not correct")
                }
            } else {
                callback('user not found')
            }
        })
    }
}

module.exports = new UserModel()