const userService = require('../service/user.service.js')
const joi = require('joi')
class UserRegistration {
    validateData = (data) => {
        const schema = joi.object({
            firstName: joi.string().min(3).required(),
            lastName: joi.string().min(3).required(),
            email: joi.string().required(),
            password: joi.string().required()
        })
        return schema.validate(data)
    }
    createUser = (req, res) => {
        var responseResult = {}
        var { error } = this.validateData(req.body)
        if (error) {
            responseResult.success = false;
            responseResult.message = "Could not create a new user";
            responseResult.error = error.details[0].message;
            res.status(400).send(responseResult)
        }
        else {
            var userContent = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
        }

        userService.createUser(userContent, (err, data) => {
            if (err) {
                responseResult.success = false;
                responseResult.message = "Could not create a new user";
                res.status(400).send(responseResult)
            } else {
                responseResult.success = true;
                responseResult.data = data;
                responseResult.message = "user created successfully";
                res.status(200).send(responseResult)
            }
        })
    }
}

module.exports = new UserRegistration()