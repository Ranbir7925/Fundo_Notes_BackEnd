require('dotenv/config')
require('./config/dbconfig')
const logger = require('./logger/logger')
const express = require('express')
const bodyParser = require('body-parser')

const app =express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(_req,res) => res.json({"message":"Welcome to fundo notes"}))

require('./app/routes/user')(app)
app.listen(process.env.PORT,() => logger.info(`Server listing on port ${process.env.PORT}`))