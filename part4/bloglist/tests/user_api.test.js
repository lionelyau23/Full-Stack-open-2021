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
    test('valid user can be added', async () => {
        const validUser = {
            username: 'jane123',
            name: 'Jane Doe',
            password: '000123'
        }

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

        const usersInDB = await helper.usersInDB()
        expect(usersInDB).toHaveLength(helper.testUsers.length + 1)
    })

    test('no username, respond with 400, not saved in DB', async () => {
        const invalidUser = {
            name: 'Jane Doe',
            password: '000123'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        const currentUsers = await helper.usersInDB()
        expect(currentUsers).toHaveLength(helper.testUsers.length)
    })

    test('username too short, respond with 400', async () => {
        const invalidUser = {
            username: 'ja' ,
            name: 'Jane Doe',
            password: '000123'
        }

        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        const currentUsers = await helper.usersInDB()
        expect(currentUsers).toHaveLength(helper.testUsers.length)
        const usernames = currentUsers.map(u => u.username)
        expect(usernames).not.toContain('ja')
    })

    test('repeated username, respond with 400', async () => {
        const usersAtStart = await helper.usersInDB()

        const invalidUser = {
            username: usersAtStart[0].username ,
            name: 'Doe Duplicate',
            password: '000123'
        }

        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(response.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
        const names = usersAtEnd.map(u => u.name)
        expect(names).not.toContain('Doe Duplicate')
    })

    test('no password, respond with 400', async () => {
        const invalidUser = {
            username: 'ja' ,
            name: 'Jane Doe'
        }

        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(response.body.error).toBe('password is missing')

        const currentUsers = await helper.usersInDB()
        expect(currentUsers).toHaveLength(helper.testUsers.length)
        const usernames = currentUsers.map(u => u.username)
        expect(usernames).not.toContain('ja')
    })

    test('password too short, respond with 400', async () => {
        const invalidUser = {
            username: 'ja' ,
            name: 'Jane Doe',
            password: '1'
        }

        const response = await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
            .expect('Content-Type',/application\/json/)

        expect(response.body.error).toBe('password is too short')

        const currentUsers = await helper.usersInDB()
        expect(currentUsers).toHaveLength(helper.testUsers.length)
        const usernames = currentUsers.map(u => u.username)
        expect(usernames).not.toContain('ja')
    })
})

afterAll(() => {
    mongoose.connection.close()
})