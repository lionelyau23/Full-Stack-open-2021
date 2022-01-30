const express = require('express')
require('express-async-errors')
const cors = require('cors')
const app = express()
const noteRouter = require('./controllers/notes')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleWare = require('./utils/middleware')
const mongoose = require('mongoose')

logger.info(`Connecting to ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB', error.message)
    })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleWare.requestLogger)

app.use('/api/notes', noteRouter)

app.use(middleWare.unknownEndPoint)
app.use(middleWare.errorHandler)

module.exports = app