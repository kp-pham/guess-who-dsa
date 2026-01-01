import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.port || 3500

const app = express()
app.use(express.static(path.join(__dirname, "../client/dist")))

const expressServer = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

const io = new Server(expressServer, {
  cors: {
    origin: ['http://localhost:5172', 'http://127.0.0.1:5173'],
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`)

  socket.on("send_message", data => {
    console.log(data)
  })
})