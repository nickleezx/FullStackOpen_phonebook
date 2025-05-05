const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false);

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

console.log('Connecting to MONGODB')
mongoose.connect(url)
    .then(response => {
        console.log("Connected to MongoDB");
    }).catch(e => {
        console.log("Error connecting to MongoDB:", e.message);
    });

module.exports = mongoose.model('Phonebook', phoneBookSchema);

