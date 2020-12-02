const userRoute = require('../model/user.model')

class UserService{
    createUser = (data,callback)=>{
        userRoute.create(data,(err,result)=>{
            err?callback(err,null) : callback(null,result)
        })
    }
}

module.exports = new UserService()