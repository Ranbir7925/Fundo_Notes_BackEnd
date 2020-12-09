const userService = require('../service/user')
const logger = require('../../logger/logger')
const joi = require('joi')
const JWT=require('../../jwt/jwt') 

class UserRegistration {
    validateData = (data) => {
        const schema = joi.object({
            firstName: joi.string().regex(/^[a-zA-Z ]+$/).min(3).required().messages({
                'string.pattern.base': 'Firstname should contain only characters.',
                'string.min': 'Firstname must have minimum 2 characters.',
                'string.empty': 'Firstname can not be empty'
            }),
            lastName: joi.string().regex(/^[a-zA-Z ]+$/).min(3).required().messages({
                'string.pattern.base': 'Firstname should contain only characters.',
                'string.min': 'Lastname must have minimum 2 characters.',
                'string.empty': 'Lastname can not be empty'
            }),
            emailId: joi.string().regex(/^[0-9a-zA-Z]+[.]*[0-9a-zA-z]*[@][a-zA-Z]+([.][a-zA-Z]+){1,3}$/).required().messages({
                'string.pattern.base': 'emailId should be in format --> someone@example.com .',
                'string.empty': 'emailId can not be empty'
            }),
            password: joi.string().min(8).regex(/(?=.*[A-Z].*)(?=.*[0-9].*)([a-zA-Z0-9]{4,}[!@#$%^&*()_+][a-zA-Z0-9]{3,})/).required().messages({
                'string.pattern.base': 'Pasword must be alphanumeric and must have atleast 1 special char.',
                'string.min': 'password must have minimum 8 characters.',
                'string.empty': 'password can not be empty'
            }),
        })
        return schema.validate(data)
    }
    validateDataForLogin = (data) => {
        const schema = joi.object({
            emailId: joi.string().regex(/^[0-9a-zA-Z]+[.]*[0-9a-zA-z]*[@][a-zA-Z]+([.][a-zA-Z]+){1,3}$/).required().messages({
                'string.pattern.base': 'emailId should be in format --> someone@example.com .',
                'string.empty': 'emailId can not be empty'
            }),
            password: joi.string().min(8).regex(/(?=.*[A-Z].*)(?=.*[0-9].*)([a-zA-Z0-9]{4,}[!@#$%^&*()_+][a-zA-Z0-9]{3,})/).required().messages({
                'string.pattern.base': 'Pasword must be alphanumeric and must have atleast 1 special char.',
                'string.min': 'password must have minimum 8 characters.',
                'string.empty': 'password can not be empty'
            }),
        })
        return schema.validate(data)
    }
    registerUser = (req, res) => {
        var responseResult = {}
        const { error } = this.validateData(req.body)
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
                emailId: req.body.emailId,
                password: req.body.password
            }
        }

        userService.registerUser(userContent, (err, data) => {
            if (err) {
                logger.error("Error occcured while creating user")
                responseResult.success = false;
                responseResult.message = "Could not create a new user";
                responseResult.error = err;
                res.status(400).send(responseResult)
            } else if (data == 'email_exits') {
                logger.info("User already exists with this email id")
                responseResult.success = false;
                responseResult.message = "User already exists with this email id";
                res.status(409).send(responseResult)
            }
            else {
                logger.info("user created successfully")
                responseResult.success = true;
                responseResult.data = data;
                responseResult.message = "user created successfully";
                res.status(200).send(responseResult)
            }
        })
    }

    findAllUser = (_req, res) => {
        var responseResult = {}
        userService.findAllUser((err, data) => {
            if (err) {
                logger.error("Error occcured while finding user")
                responseResult.success = false;
                responseResult.message = "Could not find users";
                res.status(400).send(responseResult)
            }
            else {
                logger.info("user found successfully")
                responseResult.success = true
                responseResult.data = data
                responseResult.message = "Users found successfully."
                res.status(200).send(responseResult)
            }
        })
    }

    loginUser = (req, res) => {
        var responseResult = {}
        const { error } = this.validateDataForLogin(req.body);
        if (error) {
            responseResult.success = false;
            responseResult.message = "login failed";
            responseResult.error = error.details[0].message;
            res.status(400).send(responseResult);
        } else {
            userService.loginUser(req.body, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.message = "login failed";
                    responseResult.error = err
                    res.status(422).send(responseResult)
                } else {
                    responseResult.success = true;
                    const payload={
                        id:result._id,
                        emailId:result.emailId
                    }
                    const generatedToken = JWT.generateToken(payload)
                    responseResult.token = generatedToken;
                    responseResult.data = result;
                    responseResult.message = "logged in successfuly";
                    res.status(200).send(responseResult)
                }
            })
        }
    }

    resetPassword = (req,res) => {
        var responseResult = {}
        let token = ''
        try {
            token = JWT.generateToken()
        } catch (error) {
            
        }
    }
}

module.exports = new UserRegistration()