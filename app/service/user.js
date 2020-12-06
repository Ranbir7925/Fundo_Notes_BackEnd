const userModel = require('../model/user')

class UserService {
    createUser = (data, callback) => {
        userModel.create(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }

    findAllUser = (data, callback) => {
        userModel.findAll(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }
    findOneUser = (data, callback) => {
        userModel.findOne(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }
    updateOneUser = (userId, data, callback) => {
        userModel.updateUser(userId, data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }
    deleteUser = (userId, callback) => {
        userModel.deleteUser(userId, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }
    loginUser = (data,callback) => {
        userModel.loginUser(data,(err,result)=>{
            err ? callback(err, null) : callback(null, result)
        })
    }
}

module.exports = new UserService()