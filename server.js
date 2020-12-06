require('dotenv/config')
require('./config/dbconfig')
const logger = require('./logger/logger')
const express = require('express')
const bodyParser = require('body-parser')

const app =express()

app.use(bodyParser.json())

require('./app/routes/user')(app)
app.listen(process.env.PORT,() => logger.info(`Server listing on port ${process.env.PORT}`))