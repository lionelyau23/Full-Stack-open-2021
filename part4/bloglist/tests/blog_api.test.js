const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./api_test_helper')

beforeEach(async () => {
    await Blog.deleteMany()
    const blogs = helper.testBlogs.map(b => new Blog(b))
    const promiseArray = blogs.map(b => b.save())
    await Promise.all(promiseArray)
})

describe('get route tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const blogs = (await api.get('/api/blogs')).body
        expect(blogs).toHaveLength(helper.testBlogs.length)
    })

    test('returned blog has id as unique identifier instead of _id', async () => {
        const blogs = (await api.get('/api/blogs')).body
        expect(blogs[0].id).toBeDefined()
        expect(blogs[0]._id).not.toBeDefined()
        expect(blogs[0].__v).not.toBeDefined()
    })
})

describe('addition of new blogs', () => {
    const newBlog = {
        title: 'new blog',
        author: 'John Doe new',
        url: 'new.com',
        likes: 10
    }

    test('number of blogs increase by one, new blog in blog list', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const updatedBlogs = await helper.blogsInDB()
        expect(updatedBlogs).toHaveLength(helper.testBlogs.length + 1)

        const blogContent = updatedBlogs.map(b => b.title)
        expect(blogContent).toContainEqual(newBlog.title)
    })

    test('if no likes is added, default to 0 likes', async () => {
        const noLikeBlog = { ...newBlog }
        delete noLikeBlog.likes

        const response = await api
            .post('/api/blogs')
            .send(noLikeBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const savedBlog = response.body
        expect(savedBlog.likes).toBe(0)
    })

    test('if title is missing, server responds with 400', async () => {
        const noTitleBlog = { ...newBlog }
        delete noTitleBlog.title

        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)

        const response = await helper.blogsInDB()
        expect(response).toHaveLength(helper.testBlogs.length)
    })

    test('if url is missing, server responds with 400', async () => {
        const noUrlBlog = { ...newBlog }
        delete noUrlBlog.url

        await api
            .post('/api/blogs')
            .send(noUrlBlog)
            .expect(400)

        const response = await helper.blogsInDB()
        expect(response).toHaveLength(helper.testBlogs.length)

    })

})

describe('deletion of blog', () => {
    test('successfully delet a blog with 204 status', async () => {
        const blogsInDB = await helper.blogsInDB()
        const deleteBlog = blogsInDB[0]

        await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .expect(204)

        const updatedBlogs = await helper.blogsInDB()
        expect(updatedBlogs).toHaveLength(helper.testBlogs.length - 1)

        const titles = await updatedBlogs.map(b => b.title)
        expect(titles).not.toContain(deleteBlog.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
