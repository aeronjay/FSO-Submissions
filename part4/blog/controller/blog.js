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

notesRouter.get('/api/blogs', async (request, response, next) => {
    
    try{
        let blogs = await Blog.find({})
        response.json(blogs)
    }catch(ex){
        next(ex)
    }
})

notesRouter.post('/api/blogs', async (request, response, next) => {
    const blog = new Blog(request.body)
    
    if(!blog.likes){
        blog.likes = 0
    }
    
    try{
        const result = await blog.save()
        response.status(201).json(result)
    }catch(ex){
        next(ex)
    }
})


module.exports = notesRouter