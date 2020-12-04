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

}

module.exports = new UserModel()