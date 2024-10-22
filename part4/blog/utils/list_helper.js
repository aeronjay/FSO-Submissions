const groupBy = require('lodash.groupby')
const maxBy = require('lodash.maxby')
const dummy = (blog) => {
    
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => (
        total += blog.likes
    ), 0)
}
const favoriteBlog = (blogs) => {
    return blogs.reduce((mostLiked, blog) => {
        return blog.likes > mostLiked.likes ? blog : mostLiked
    })
}
const mostBlogs = (blogs) => {
    const authorBlogs = groupBy(blogs, 'author')
    const newAuthorBlogsList = []
    for(const obj in authorBlogs){
        const newAuthorBlogs = {}
        newAuthorBlogs.author = obj
        newAuthorBlogs.blogs = authorBlogs[obj].length;
        newAuthorBlogsList.push(newAuthorBlogs)
    }
    return maxBy(newAuthorBlogsList, (obj) => obj.blogs);
}   


module.exports = {  dummy, totalLikes, favoriteBlog, mostBlogs  }