const User = require('../models/user')
const bcrypt = require('bcrypt')

const testUsers = [
    {
        username: 'johndoe01',
        name: 'John Doe 1',
        password: '0123456',
    },
    {
        username: 'johndoe02',
        name: 'John Doe 2',
        password: '0223456',
    },
    {
        username: 'johndoe03',
        name: 'John Doe 3',
        password: '0323456',
    },
]

const encryptedUser = async () => {
    const encryptedUsers = testUsers.map(async user => {
        const passwordHash = await bcrypt.hash(user.password, 10)

        return {
            username: user.username,
            name: user.name,
            passwordHash
        }
    })
    const results = await Promise.all(encryptedUsers)
    return results
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const usersInDBRaw = async () => {
    const users = await User.find({})
    return users
}

module.exports = {
    testUsers,
    encryptedUser,
    usersInDB,
    usersInDBRaw
}