const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.static('dist'));
app.use(express.json());

const logger = morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['posted-msg'] = JSON.stringify(req.body),
    ].join(' ')
  })

app.use(logger);


let phoneBook = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/api/persons', (request, response) => {
    response.json(phoneBook);
})

app.get('/info', (request, response) => {
    const length = phoneBook.length;

    response.send(`<p>Phonebook has info for ${length} people</p>
                    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    const person = phoneBook.find(p => p.id === id);

    if (!person){
        return response.status(404).send('Person not found');
    }

    response.json(person);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    phoneBook = phoneBook.filter(p => p.id !== id);
    response.status(204).end();
})

const generateId = () => {
    return String(Math.floor(Math.random() * 1001));
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number)
        return response.status(400).json({
            error: "No name or phone number indicated"
        })

    const found = phoneBook.find(p => p.name.toLowerCase() === body.name.toLowerCase())

    if (found)
        return response.status(400).json({
            error: `name must be unique`,
        })
    
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    phoneBook = phoneBook.concat(person)
    response.json(person);
})





const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})