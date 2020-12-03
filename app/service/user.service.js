const userRoute = require('../model/user.model')

class UserService{
    createUser = (data,callback)=>{
        userRoute.create(data,(err,result)=>{
            err?callback(err,null) : callback(null,result)
        })
    }

    findAllUser =(data,callback) => {
        userRoute.findAll(data,(err,result) =>{
            err?callback(err,null) : callback(null,result)
        })
    }
}

module.exports = new UserService()