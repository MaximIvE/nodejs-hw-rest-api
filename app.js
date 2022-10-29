const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const status = err.status || 500;
  // const message = status === 500 ? "Server error" : err.message;
  const message = err.message;
  res.status(status).json({ message })
})

module.exports = app