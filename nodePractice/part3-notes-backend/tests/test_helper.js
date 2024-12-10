/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable @stylistic/js/indent */

const Note = require('../models/note')

const initialNotes = [
    {
      content: 'HTML is easy',
      important: false
    },
    {
      content: 'Browser can execute only JavaScript',
      important: true
    }
  ]




const nonExistingId = async () => {
    const note = new Note({ content: 'willremovethissoon' })
    await note.save()
    await note.deleteOne()
    
    return note._id.toString()
}

const notesInDb = async () => {
    const notes = await Note.find({})
    return notes.map(note => note.toJSON())
}

module.exports = {  nonExistingId, notesInDb, initialNotes  }