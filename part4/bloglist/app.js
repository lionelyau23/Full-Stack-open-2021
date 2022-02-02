const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controller/blogs')
const userRouter = require('./controller/users')
const loginRouter = require('./controller/login')
const middleWare = require('./utils/middleware')

const mongoURL = config.MONGODB_URI

mongoose
    .connect(mongoURL)
    .then(() => logger.info('connected to MongoDB'))
    .catch((error) => logger.info(`failed to connct to MongoDB ${error.message}`))

app.use(cors())
app.use(express.json())
app.use(middleWare.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/blogs', middleWare.userExtrator, blogRouter)
app.use('/api/users', userRouter)

app.use(middleWare.unknownEndPoint)
app.use(middleWare.errorHandler)

module.exports = app