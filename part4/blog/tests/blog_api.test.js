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

test('verifies that the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs');

    assert(Array.isArray(response.body), 'Response body should be an array');
    
    response.body.forEach(blog => {
      assert(blog.id, 'Blog post should have an id');
      assert.strictEqual(blog._id, undefined, 'Blog post should not have _id');
    });

})

test('post method create a new blog in db', async () => {
    const NewBlog =     {
        title: "new Blog Title",
        author: "new Author Title",
        likes: 1231,
        url: "NEW blog url"
    }
    await api.post('/api/blogs')
        .send(NewBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    
    const response = await api.get('/api/blogs')
    const contents = response.body.map(res => res.title)
    assert.strictEqual(response.body.length, blogs.length + 1)
    assert(contents.includes("new Blog Title"))

})

test('no likes default to 0', async () => {
    let newBlog = {
        title: "the art of not giving a fuck",
        author: "mark manson",
        url: "spotify chuchu"
    }
    
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(res => {
            if(res.body.likes !== 0){
                throw new Error(`LIKES NOT 0 as defualt`)
            }
        })
})
test('POST /api/blogs fails with status 400 if title or url is missing', async () => {
    const newBlog = {
        author: 'Test Author',
        likes: 5,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
        .expect(res => {
            if(res.body.error !== "title and url required"){
                throw new Error(`title and url required`)
            }
        });
});
after(async () => {
    await mongoose.connection.close()
})