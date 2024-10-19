const {  test, describe  } = require('node:test')
const assert = require('assert')
const list_helper = require('../utils/list_helper')

const blogs = [
    {
        author: "RObverto",
        blogs: 6
    },
    {
        author: "Robert C. Martin",
        blogs: 23
    },
    {
        author: "Martin",
        blogs: 21
    },
    {
        author: "Martik",
        blogs: 71
    },
    {
        author: "CMART",
        blogs: 12
    },
    

]

describe('mostBlogs', () => {
    test('returns highest blogs ', () => {
        const result = list_helper.mostBlogs(blogs)
        assert.deepStrictEqual(result, blogs[3])
    })
})