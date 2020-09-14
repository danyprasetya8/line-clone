const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/user')
const cors = require('cors')
require('dotenv/config')

mongoose.connect(process.env.LOCAL_DB_CONNECTION_URI, { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', err => console.log(err))
db.once('open', () => console.log('Connected to database'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/users', userRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT)