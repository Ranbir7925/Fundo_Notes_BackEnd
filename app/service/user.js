const userRoute = require('../model/user')

class UserService {
    createUser = (data, callback) => {
        userRoute.create(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }

    findAllUser = (data, callback) => {
        userRoute.findAll(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }
    findOneUser = (data, callback) => {
        userRoute.findOne(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }
    updateOneUser = (userId, data, callback) => {
        userRoute.updateUser(userId, data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }
}

module.exports = new UserService()