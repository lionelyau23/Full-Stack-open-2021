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

describe('test with initial state of user', () => {
    test('get successful return 200 status, ', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type',/application\/json/)
    })

    test('all users are returned, and saved in DB', async () => {
        const returnedUsers = (await api.get('/api/users')).body
        expect(returnedUsers).toHaveLength(helper.testUsers.length)

        const savedUsers = await helper.usersInDB()
        expect(savedUsers).toHaveLength(helper.testUsers.length)
    })

    test('returned users formatted correctly by toJSON', async () => {
        const returnedUsers = (await api.get('/api/users')).body
        expect(returnedUsers[0].id).toBeDefined()
        expect(returnedUsers[0]._id).not.toBeDefined()
        expect(returnedUsers[0].__v).not.toBeDefined()
        expect(returnedUsers[0].passwordHash).not.toBeDefined()
    })

    test('users in DB save the correct properties', async () => {
        const savedUsers = await helper.usersInDBRaw()
        expect(savedUsers[0].name).toBeDefined()
        expect(savedUsers[0].username).toBeDefined()
        expect(savedUsers[0].password).not.toBeDefined()
        expect(savedUsers[0].passwordHash).toBeDefined()
    })
})

describe('post route tests', () => {
    const validUser = {
        username: 'jane123',
        name: 'Jane Doe',
        password: '000123'
    }

    test('valid user can be added', async () => {
        const response = await api
            .post('/api/users')
            .send(validUser)
            .expect(200)
            .expect('Content-Type',/application\/json/)

        const savedUser = response.body
        expect(savedUser.username).toBe(validUser.username)
        expect(savedUser.name).toBe(validUser.name)
        expect(savedUser.password).not.toBeDefined()
        expect(savedUser.passwordHash).not.toBeDefined()
    })

    // test('test invalid username, respond with 400', async () => {
    //     const

    //     await api
    //         .post('/api/users')
    //         .send()
    // })
})

afterAll(() => {
    mongoose.connection.close()
})