const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
morgan.token('body', function getBody(req) {
  const sentData = {
    name: req.body.name,
    number: req.body.number
  }
  return JSON.stringify(sentData)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Arto Hellas",
    "number": "23-24-2323232",
    "id": 1
  }
]

app.get('/', (req, res) => {
  res.send('<h2>Ciao pippo</h2>')
})

app.get('/info', (req, res) => {
  res.send(
    `
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date(Date.now())}</p>
    `
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const person = persons.find(person => person.id === Number(req.params.id))
  if (person !== undefined) {
    res.json(person)
  } else {
    res.status(404).send('Not Found')
  }
})

app.post('/api/persons', (req, res) => {
  const newPerson = req.body
  if (newPerson.name === '') {
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if (newPerson.number === '') {
    return res.status(400).json({
      error: 'number missing'
    })
  }
  const personSearch = persons.find(person => {
    return (person.name === newPerson.name)
  })
  if (personSearch !== undefined && personSearch.number === newPerson.number) {
    return res.status(400).json({
      error: 'name already added to the phonebook'
    })
  }
  newPerson.id = Math.floor(Math.random() * 1001)
  persons = persons.concat(newPerson)
  res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
  const person = persons.find(person => person.id === Number(req.params.id))
  if (person !== undefined) {
    persons = persons.filter(person => person.id !== Number(req.params.id))
    res.status(204).end()
  } else {
    res.status(404).send('Not Found')
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
