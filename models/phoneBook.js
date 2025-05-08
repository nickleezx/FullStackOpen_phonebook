const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: prop => `${prop.value} is not a valid phone number`
    },
    required: true,
  }
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

console.log('Connecting to MONGODB')
mongoose.connect(url)
  .then(response => {
    console.log('Connected to MongoDB')
  }).catch(e => {
    console.log('Error connecting to MongoDB:', e.message)
  })

module.exports = mongoose.model('Phonebook', phoneBookSchema)

