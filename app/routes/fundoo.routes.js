const user = require('../controller/user.controller')
module.exports = (app) => {
    // Define a simple route to display Message at the homepage
    app.get('/',(_req,res) => res.json({"message":"Welcome to fundo notes"}))
    // Create a new User
    app.post('/createUser',user.createUser)
}