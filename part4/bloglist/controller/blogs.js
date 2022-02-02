// const logger = require('../utils/logger')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await request.user

    if (!user) {
        return response.status(401).json({ error: 'user authorization failed' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save({ validateModifiedOnly: true })

    response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    const user = await request.user
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).json({ error: 'blog id not found' })
    }

    if (user._id.toString() === blog.user.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString())
        await user.save({ validateModifiedOnly: true })
    } else {
        return response.status(401).json({ error: 'blog can only be deleted by the creator' })
    }

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const changedBlog = { ...body }
    delete changedBlog.id

    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, changedBlog, { new: true })
    response.json(savedBlog)
})

module.exports = blogRouter
