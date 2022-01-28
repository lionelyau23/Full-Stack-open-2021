// require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGOATLAS_URL

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        validate: num => {
            return /\d{2,3}-\d+/.test(num)
        },
        minLength: 8,
        required:true
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// const person = new mongoose.model('Person', personSchema)

// person.find({}).then(result => {
//     result.forEach(p => {
//         console.log(`${p.name} ${p.id} ${p.number}`)
//     })
// })

module.exports = mongoose.model('Person', personSchema)
