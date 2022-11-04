const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const fs = require('fs/promises')

const authRouter = require('./routes/api/auth')
const contactsRouter = require('./routes/api/contacts')

const dotenv = require("dotenv")
dotenv.config()

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const tempDir = path.join(__dirname, 'tmp/');
const newTempDir = path.join(__dirname, "public", "avatars")
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
});

const upload = multer({
  storage: multerConfig, 
})

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', authRouter)
app.use('/api/contacts', contactsRouter)
app.get('/avatars/:cover', (req, res) => {
  res.sendFile(newTempDir + req.params.cover)
});
app.post("/api/files", upload.single("cover"), async (req, res) => {
  // console.log(req.body);
  console.log(req.file);
  const { path: tempDir, originalname } = req.file;
  await fs.rename(tempDir, newTempDir + originalname)
})


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