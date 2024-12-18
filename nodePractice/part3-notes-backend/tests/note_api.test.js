/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable @stylistic/js/indent */
const {  test, after, beforeEach  } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Note = require('../models/note')
const helper = require('./test_helper')

const api = supertest(app)

const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only JavaScript',
        important: true,
    }
]
beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
})



test('notes are returned', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})
test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)


})

test('the first note is HTML is easy', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
})

test('a note can be added to the db', async () => {
    const newNote = {
        content: 'async await i check',
        important: true,
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    
    const response = await api.get('/api/notes')
    const contents = response.body.map(note => note.content)

    assert.strictEqual(response.body.length, initialNotes.length + 1)
    assert(contents.includes('async await i check'))

})

test('a note without content cannot be saved from the db', async () => {
    const newNote = {
        important: true
    }

    await api.post('/api/notes')
        .send(newNote)
        .expect(400)
    
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, initialNotes.length)

})
test('all notes are returned', async () => {
    const response = await api.get('/api/notes')
  
     assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a valid note can be added ', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
  
    const contents = notesAtEnd.map(n => n.content)
    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }
  
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
  
    const notesAtEnd = await helper.notesInDb()
  
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
  })
  
after(async () => {
    await mongoose.connection.close()
})

