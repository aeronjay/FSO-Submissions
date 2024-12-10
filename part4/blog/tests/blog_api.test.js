const {  test, after, beforeEach  } = require('node:test')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const Blog = require('../models/blogModel')
const assert = require('node:assert')

const api = supertest(app)

const blogs = [
    {
        title: "example title",
        author: "example author",
        likes: 1231,
        url: "example url"
    },
    {
        title: "the art of not giving a fuck",
        author: "mark manson",
        likes: 1231,
        url: "spotify chuchu"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let newBlog = new Blog(blogs[0])
    await newBlog.save(newBlog)
    newBlog = new Blog(blogs[1])
    await newBlog.save(newBlog)
})

test('returns correct amount of blog post', async () => {
    const response = await api.get('/api/blogs')
    
    assert.strictEqual(response.body.length, blogs.length)
})

test('notes are returned in JSON format', async () => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
})