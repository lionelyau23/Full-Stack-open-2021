const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./user_api_test_helper')

beforeEach(async () => {
    await User.deleteMany()
    const eUsers = await helper.encryptedUser()
    const users = eUsers.map(u => new User(u))
    const usersPromises = users.map(u => u.save())
    await Promise.all(usersPromises)
})

describe('test login', () => {
    test('success login return 200 status and token', async () => {
        const user = helper.testUsers[0]

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type',/application\/json/)

        expect(response.body.token).toBeDefined()
        expect(response.body.token).not.toBe('')
    })

    test('no username cant login, 401 status', async () => {
        const user = { ...helper.testUsers[0] }
        delete user.username

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(401)
            .expect('Content-Type',/application\/json/)
        expect(response.body.error).toBe('invalid username or password')
    })

    test('no password cant login, 401 status', async () => {
        const user = { ...helper.testUsers[0] }
        delete user.password

        console.log(user)
        const response = await api
            .post('/api/login')
            .send(user)
            .expect(401)
            .expect('Content-Type',/application\/json/)
        expect(response.body.error).toBe('invalid username or password')
    })
})

afterAll(() => {
    mongoose.connection.close()
})