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
        unique: true,
        required: true
    },
    password: {
        type: String,
        min: 8,
        required: true
    }
})

var User = mongoose.model("User", userSchema)

class UserModel {
    registerUser = (data, callback) => {

        try {
            User.findOne({emailId:data.emailId},(err,result)=>{
                if(err){
                    callback(err,null);
                }
                else if(result != null){
                    callback(null,'email_exits')
                }
                else{
                    const user = new User({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        emailId: data.emailId,
                        password: data.password
                    })
                    user.save((err,data)=>{
                        if(err){
                            callback(err,null)
                        }
                        else{
                            callback(null, data)
                        }
                    })
                    
                }
            })
        }
        catch (error) {
            callback(error, null)
        }
    }

    findAll = (data, callback) => {
        User.find(data, (err, result) => {
            err ? callback(err, null) : callback(null, result)
        })
    }

    loginUser = (data, callback) => {
        User.findOne({ emailId: data.emailId }, (err, result) => {
            if (err) {
                callback(err, null)
            }
            else if (result != null) {
                callback(null, result)
            }
            else {
                callback("User not fount")
            }
        })
    }
}

module.exports = new UserModel()