const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controller/blogs')

const mongoURL = config.MONGODB_URI

mongoose
    .connect(mongoURL)
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) => logger.info(`failed to connct to MongoDB ${error.message}`))

app.use(cors())
app.use(express.json())

app.use('/', blogRouter)

module.exports = app