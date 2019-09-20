const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// const url = process.env.MONGODB_URI
const url = 'mongodb://localhost:27017/myapp'

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{8,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)