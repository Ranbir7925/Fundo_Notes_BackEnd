require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')

const app =express()

app.use(bodyParser.json())

require('./app/routes/fundoo.routes')(app)
app.listen(process.env.PORT,() => console.log(`Server listing on port ${process.env.PORT}`))