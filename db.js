require('dotenv').config()
const mongoose = require('mongoose')


const db = mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
    console.error('Uh oh, problem connecting to DB ->', err.message)
})

module.exports = db