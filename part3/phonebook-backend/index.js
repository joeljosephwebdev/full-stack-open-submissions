const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content.length] :response-time ms :body'))


let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary P0ppendick",
        number: "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 10000000)
}

app.post('/api/persons', (request, response) => {

    const names = [...persons.map(person => person.name)]

    if (!request.body.name || !request.body.number) {
        return response.status(400).json({
            error: 'name or number cannot be blank'
        })
    }

    //wrote an overly complex expression instead of just using names.includes() in order to ignore case when checking names
    if (names.filter((name) => name.toLowerCase().includes(request.body.name.toLowerCase())).length > 0) {
        return response.status(400).json({
            error: 'name already exists in phonebook'
        })
    }

    const person = {
        id: generateId(),
        name: request.body.name,
        number: request.body.number
    }

    persons = persons.concat(person)
    response.json(person)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})