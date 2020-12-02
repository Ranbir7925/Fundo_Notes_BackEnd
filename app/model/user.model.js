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
    email: {
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
                email: data.email,
                password: data.password
            })
            user.save()
            callback(null, user)
        } catch (error) {
            callback(error, null)
        }
    }
}

module.exports = new UserModel()