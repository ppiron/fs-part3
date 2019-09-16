const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json())
app.use(morgan('tiny'))

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
  if (persons.find(person => {
    return (person.name === newPerson.name)
  }) !== undefined) {
    return res.status(400).json({
      error: 'name already in the database'
    })
  }
  newPerson.id = Math.floor(Math.random() * 1001)
  persons = persons.concat(newPerson)
  res.json(persons)
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
