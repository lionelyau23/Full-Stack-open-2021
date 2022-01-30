const mongoose = require('mongoose')

const blogScheme = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogScheme.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogScheme)
