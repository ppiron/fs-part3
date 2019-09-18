const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://pao:${password}@cluster0-qe630.mongodb.net/test?retryWrites=true&w=majority`
// const url = 'mongodb://localhost:27017/myapp'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find().then(items => {
    const response = items.map(item => `${item.name} ${item.number}`).join('\n')
    console.log('phonebook:')
    console.log(response)
    mongoose.connection.close()
  })
}
