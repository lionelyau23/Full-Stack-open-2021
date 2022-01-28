require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGOATLAS_URL

module.exports = {
    PORT,
    MONGODB_URI
}