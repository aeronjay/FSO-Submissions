const express = require('express')
const app = express()
const blogRouter = require('./controller/blog')
const cors = require('cors')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())

app.use('/', blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app