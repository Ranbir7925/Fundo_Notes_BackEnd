require('dotenv/config')
const logger = require('../logger/logger')
const mongoose = require('mongoose')
mongoose.set("useFindAndModify", false);
const DB_CONFIG = mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false, 'useCreateIndex': true })
    .then(() => logger.info("Successfully connected to the database"))
    .catch(err => {
        logger.error('Could not connect to the database. Exiting now...', err);
        process.exit()
    })

 module.exports = DB_CONFIG