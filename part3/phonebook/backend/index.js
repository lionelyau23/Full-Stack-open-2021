require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Persons = require('./models/person')

// let data = [
//     {
//         'id': 1,
//         'name': 'Arto Hellas',
//         'number': '040-123456'
//     },
//     {
//         'id': 2,
//         'name': 'Ada Lovelace',
//         'number': '39-44-5323523'
//     },
//     {
//         'id': 3,
//         'name': 'Dan Abramov',
//         'number': '12-43-234345'
//     },
//     {
//         'id': 4,
//         'name': 'Mary Poppendieck',
//         'number': '39-23-6423122'
//     }
// ]

app.use(express.json())

morgan.token('content', (request, response) => (
    JSON.stringify(request.body)
)
)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (request, response) => {
    Persons.find({}).then(result => {
        response.json(result)
    })
})

app.get('/info', (request, response) => {
    Persons.find({})
        .then(result => {
            response.send(`
            <p>Phonebook has info for ${result.length} people</p>
            <p>${new Date()}</p>
            `)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // const person = data.find(person => person.id === id)

    // if (person) {
    //     response.json(person)
    // } else {
    //     response.statusMessage = 'no such id exists'
    //     response.status(404).end()
    // }
    Persons.findById(request.params.id)
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    // const id = Number(request.params.id)
    // data = data.filter(p => p.id !== id)

    // response.status(204).end()
    Persons.findByIdAndRemove(request.params.id)
        .then(
            response.status(204).end()
        )
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    // if (!body.name) {
    //     return response.status(404).json({
    //         error: "name is missing"
    //     })
    // } else if (!body.number) {
    //     return response.status(404).json({
    //         error: "number is missing"
    //     })
    // }
    // else if (data.find(p => p.name === body.name)) {
    //     return response.status(404).json({
    //         error: `${body.name} is already in the phonebook`
    //     })
    // }

    if (Persons.find({ name: body.name }) !== null) {
        return response.status(400).send({ error: `${body.name} already exists in the phonebook` })
    }

    const person = new Persons({
        name: body.name,
        number: body.number,
        // id: Math.round(Math.random() * 1000)
    })

    // data = data.concat(person)

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const person = {
        name: request.body.name,
        number: request.body.number
    }

    Persons.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'incorrect id format' })
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})