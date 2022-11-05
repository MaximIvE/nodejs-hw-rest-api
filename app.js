const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const path = require('path')

// const fs = require('fs/promises')

const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)


// app.post("/api/files", upload.single("cover"), async (req, res) => {
//   // console.log("req.body", req.body);
//   // console.log ("req,file", req.file);
//   const { path: tmpDir, originalname } = req.file;
//   const tmpDirUpdate = path.join(__dirname, "public", "avatars", originalname) 
//   await fs.rename(tmpDir, tmpDirUpdate);
//   const avatarURL = path.join("avatars", originalname);
//   // const baseUrl = "http://localhost:3000/"
//   const newUser = {
//     ...req.body,
//     avatarURL: avatarURL,
//   };
//   res.status(201).json(newUser);
// })


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