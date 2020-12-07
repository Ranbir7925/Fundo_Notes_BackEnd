const user = require('../controller/user')
module.exports = (app) => {
    // Define a simple route to display Message at the homepage
    // Create a new User
    app.post('/user',user.registerUser)
    // // Retrieve all Users
    app.get('/user',user.findAllUser)
    //Login user
    app.post('/login',user.loginUser)
}