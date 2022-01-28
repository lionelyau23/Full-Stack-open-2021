const mongoose = require('mongoose')

const blogScheme = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

module.exports = mongoose.model('Blog', blogScheme)
