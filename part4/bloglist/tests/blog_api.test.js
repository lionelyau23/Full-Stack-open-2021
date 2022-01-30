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

describe('initialization tests', () => {
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
})

afterAll(() => {
    mongoose.connection.close()
})
