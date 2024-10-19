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
    
} 


module.exports = {  dummy, totalLikes, favoriteBlog  }