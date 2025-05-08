require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Phonebook = require('./models/phoneBook')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

const logger = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'),
    '-',
    tokens['response-time'](req, res),
    'ms',
    (tokens['posted-msg'] = JSON.stringify(req.body)),
  ].join(' ')
})

app.use(logger)

let phoneBook = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.get('/api/persons', (request, response) => {
  Phonebook.find({})
    .then((result) => {
      response.json(result)
    })
    .catch((e) => {
      console.log('Error fetching all persons from database', e.message)
    })
})

app.get('/info', (request, response, next) => {
  Phonebook.find({}).then((result) => {
    const length = result.length
    response.send(`<p>Phonebook has info for ${length} people</p>
                        <p>${new Date()}</p>`)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id)
    .then((result) => {
      response.json(result)
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((contact) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

const generateId = () => {
  return String(Math.floor(Math.random() * 1001))
}

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number)
    return response.status(400).json({
      error: 'No name or phone number indicated',
    })

  // const found = phoneBook.find(p => p.name.toLowerCase() === body.name.toLowerCase())

  // if (found)
  //     return response.status(400).json({
  //         error: `name must be unique`,
  //     })

  const person = new Phonebook({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  }

  Phonebook.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message })

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})
