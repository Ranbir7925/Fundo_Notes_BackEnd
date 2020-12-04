const user = require('../controller/user')
module.exports = (app) => {
    // Define a simple route to display Message at the homepage
    app.get('/',(_req,res) => res.json({"message":"Welcome to fundo notes"}))
    // Create a new User
    app.post('/user',user.createUser)
    // Retrieve all Users
    app.get('/user',user.findAllUser)
    // Retrieve User by Id
    app.get('/user/:userId',user.findOneUser)    
    // Retrieve User by Id
    app.put('/user/:userId',user.updateOneUser)
    // Delete User by Id
    app.delete('/user/:userId',user.deleteUser)
}