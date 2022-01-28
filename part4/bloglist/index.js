const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogScheme = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogScheme)

const mongoURL = 'mongodb+srv://fso2021yau:fso2021@cluster0.g50xl.mongodb.net/bloglist-app?retryWrites=true&w=majority'

mongoose
    .connect(mongoURL)
    .then(() => console.log('connected to MongoDB'))
    .catch(() => console.log('failed to connct to MongoDB'))

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch(error => {
            console.log(error)
        })
})

app.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})