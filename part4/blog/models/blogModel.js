const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();  // Rename `_id` to `id`
      delete ret._id;               // Optionally, remove the `_id` field
      delete ret.__v;               // Remove version field if present
    }
  });

module.exports = mongoose.model('Blog', blogSchema)