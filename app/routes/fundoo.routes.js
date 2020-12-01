module.exports = (app) => {
    app.get('/',(_req,res) => res.json({"message":"Welcome to fundo notes"}))
}