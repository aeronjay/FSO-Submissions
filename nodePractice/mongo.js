const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.pvsbo.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'New Content Sample',
    important: false,
})

// note.save().then(result => {
//     console.log(`Note saved: ${result}`)
//     mongoose.connection.close()
// })
Note.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
})