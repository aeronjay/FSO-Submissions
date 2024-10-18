const notesRouter = require('express').Router()
const logger = require('../utils/logger')
const config = require('../utils/config')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('../models/blogModel')


mongoose.connect(config.MONGO_URI)
    .then(() => console.log("sueccessfully connected to db"))
    .catch((error) => console.log("error with database", error))

notesRouter.use(cors())

notesRouter.get('/api/blogs', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
        .catch((error) => next(error))
})

notesRouter.post('/api/blogs', (request, response, next) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})


module.exports = notesRouter