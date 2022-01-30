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

afterAll(() => {
    mongoose.connection.close()
})
