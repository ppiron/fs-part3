const express = require('express')

const app = express()

const persons = [
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

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
