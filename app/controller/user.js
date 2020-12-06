const userService = require('../service/user')
const logger = require('../../logger/logger')
const joi = require('joi')

class UserRegistration {
    validateData = (data) => {
        const schema = joi.object({
            firstName: joi.string().min(3).required(),
            lastName: joi.string().min(3).required(),
            emailId: joi.string().regex(/^[0-9a-zA-Z]+[.]*[0-9a-zA-z]*[@][a-zA-Z]+([.][a-zA-Z]+){1,3}$/).required(),
            password: joi.string().regex(/(?=.*[A-Z].*)(?=.*[0-9].*)([a-zA-Z0-9]{4,}[!@#$%^&*()_+][a-zA-Z0-9]{3,})/).required()
        })
        return schema.validate(data)
    }
    validateDataForLogin = (data) => {
        const schema = joi.object({
            emailId: joi.string().regex(/^[0-9a-zA-Z]+[.]*[0-9a-zA-z]*[@][a-zA-Z]+([.][a-zA-Z]+){1,3}$/).required(),
            password: joi.string().regex(/(?=.*[A-Z].*)(?=.*[0-9].*)([a-zA-Z0-9]{4,}[!@#$%^&*()_+][a-zA-Z0-9]{3,})/).required()
        })
        return schema.validate(data)
    }
    createUser = (req, res) => {
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

        userService.createUser(userContent, (err, data) => {
            if (err) {
                logger.error("Error occcured while creating user")
                responseResult.success = false;
                responseResult.message = "Could not create a new user";
                res.status(400).send(responseResult)
            } else {
                logger.info("Greeting created successfully")
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

    findOneUser = (req, res) => {
        var responseResult = {}
        userService.findOneUser(req.params.userId, (err, data) => {
            if (err) {
                logger.error("Error occcured while finding")
                responseResult.success = false;
                responseResult.message = "Could not find users by provided id";
                res.status(400).send(responseResult)
            } else {
                logger.info("User found successfully by provided id")
                responseResult.success = true
                responseResult.data = data
                responseResult.message = `Users found successfully by id= ${req.params.userId}.`;
                res.status(200).send(responseResult)
            }
        })
    }

    updateOneUser = (req, res) => {
        var responseResult = {}
        userService.updateOneUser(req.params.userId, req.body, (err, data) => {
            if (err) {
                logger.error("Error occcured while updating user details")
                responseResult.success = false;
                responseResult.message = "Could not update useer details with the given id";
                res.status(400).send(responseResult);
            }
            else {
                logger.info("user details updated successfully")
                responseResult.success = true;
                responseResult.data = data;
                responseResult.message = "User details updated successfully.";
                res.status(201).send(responseResult)
            }
        })
    }

    deleteUser = (req, res) => {
        var responseResult = {}
        userService.deleteUser(req.params.userId, (err, data) => {
            if (err) {
                logger.error("Error occcured while deleting user details")
                responseResult.success = false;
                responseResult.message = "Could not delete user details with the given id";
                res.status(400).send(responseResult);
            } else {
                logger.info("User details deleted successfully")
                responseResult.success = true;
                responseResult.data = data;
                responseResult.message = "User details deleted ";
                res.status(200).send(responseResult);
            }
        })
    }
    loginUser = (req, res) => {
        var responseResult = {}
        const { error } = this.validateDataForLogin(req.body);
        if (error) {
            responseResult.success = false;
            responseResult.message = "Could not delete user details with the given id";
            responseResult.error = error.details[0].message;
            res.status(400).send(responseResult);
        } else {
            userService.loginUser(req.body, (err, result) => {
                if (err) {
                    responseResult.success = false;
                    responseResult.message = "login failed";
                    responseResult.error = err;
                    res.status(422).send(responseResult)
                }else{
                    responseResult.success = true;
                    responseResult.data = result;
                    responseResult.message = "logged in successfuly";
                    res.status(200).send(responseResult)
                }
            })
        }
    }
}

module.exports = new UserRegistration()