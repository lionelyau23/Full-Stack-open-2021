const Blog = require('../models/blog')

const testBlogs = [
    {
        title: '1st blog',
        author: 'John Doe',
        url: '1st.com',
        likes: 1
    },
    {
        title: '2nd blog',
        author: 'John Doe2',
        url: '2nd.com',
        likes: 2
    },
    {
        title: '3rd blog',
        author: 'John Doe3',
        url: '3rd.com',
        likes: 3
    },
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

module.exports = {
    testBlogs,
    blogsInDB
}