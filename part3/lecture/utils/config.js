require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGOATLAS_URL
    : process.env.MONGOATLAS_URL

module.exports = {
    PORT,
    MONGODB_URI
}