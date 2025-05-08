const mongoose = require('mongoose')

if (process.argv.length < 3){
  console.log('Enter password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nicklee2345:${password}@singapore.upjqccs.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Singapore`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const PhoneBook = mongoose.model('PhoneBook', phoneBookSchema)

if (process.argv.length < 4) {
  PhoneBook.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]

  const contact = new PhoneBook({
    name: name,
    number: number,
  })

  contact.save().then(result => {
    console.log(`added ${result.name} ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}