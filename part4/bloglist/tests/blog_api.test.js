const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./blog_api_test_helper')
const userHelper = require('../tests/user_api_test_helper')
const User = require('../models/user')

describe('get route tests', () => {
    beforeEach(async () => {
        await Blog.deleteMany()
        const blogs = helper.testBlogs.map(b => new Blog(b))
        const promiseArray = blogs.map(b => b.save())
        await Promise.all(promiseArray)
    })

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

    let auth = 'bearer '
    let blogsBefore

    beforeAll(async () => {
        await Blog.deleteMany()
        await User.deleteMany()
        const eUsers = await userHelper.encryptedUser()
        const user = new User(eUsers[0])
        await user.save()
        // const users = eUsers.map(u => new User(u))
        // const usersPromises = users.map(u => u.save())
        // await Promise.all(usersPromises)

        //login to get token
        const response = await api
            .post('/api/login')
            .send(userHelper.testUsers[0])

        auth = auth.concat(response.body.token)
        // console.log(auth)
    })

    beforeEach(async () => {
        blogsBefore = await helper.blogsInDB()
    })

    test('number of blogs increase by one, new blog in blog list', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', auth)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const updatedBlogs = await helper.blogsInDB()
        expect(updatedBlogs).toHaveLength(blogsBefore.length + 1)

        const blogContent = updatedBlogs.map(b => b.title)
        expect(blogContent).toContainEqual(newBlog.title)

        const savedBlog = response.body
        const creator = (await userHelper.usersInDB())[0]
        expect(savedBlog.user).toBe(creator.id.toString())
        expect(creator.blogs.map(b => b.toString())).toContain(savedBlog.id)
    })

    test('if no likes is added, default to 0 likes', async () => {
        const noLikeBlog = { ...newBlog }
        delete noLikeBlog.likes

        const response = await api
            .post('/api/blogs')
            .set('Authorization', auth)
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
            .set('Authorization', auth)
            .send(noTitleBlog)
            .expect(400)

        const response = await helper.blogsInDB()
        expect(response).toHaveLength(blogsBefore.length)
    })

    test('if url is missing, server responds with 400', async () => {
        const noUrlBlog = { ...newBlog }
        delete noUrlBlog.url

        await api
            .post('/api/blogs')
            .set('Authorization', auth)
            .send(noUrlBlog)
            .expect(400)

        const response = await helper.blogsInDB()
        expect(response).toHaveLength(blogsBefore.length)

    })
})

describe('deletion of blog', () => {
    let auth = 'bearer '

    beforeAll(async () => {
        //login to get token
        const response = await api
            .post('/api/login')
            .send(userHelper.testUsers[0])

        auth = auth.concat(response.body.token)
    })

    test('successfully delet a blog with 204 status', async () => {
        const blogsInDB = await helper.blogsInDB()
        const deleteBlog = blogsInDB[0]

        const response = await api
            .delete(`/api/blogs/${deleteBlog.id}`)
            .set('Authorization', auth)
            .expect(204)

        const updatedBlogs = await helper.blogsInDB()
        expect(updatedBlogs).toHaveLength(blogsInDB.length - 1)

        const ids = await updatedBlogs.map(b => b.id)
        expect(ids).not.toContain(deleteBlog.id)
    })
})

describe('update a blog', () => {
    test('return 200 status if update is successfull', async () => {
        const blogsInDB = await helper.blogsInDB()
        const updateBlog = { ...blogsInDB[0] }
        updateBlog.likes = 101

        await api
            .put(`/api/blogs/${updateBlog.id}`)
            .send(updateBlog)
            .expect(200)

        const updatedBlogs = await helper.blogsInDB()
        const likes = updatedBlogs.map(b => b.likes)

        expect(likes).toContain(101)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
