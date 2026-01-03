import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

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
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ["GET", "POST"]
  }
});

const queue = []

function match() {
  while (queue.length >= 2) {
    const player1 = queue.shift()
    const player2 = queue.shift()
    startGame(player1, player2)
  }
}

function startGame(player1, player2) {
  const room = crypto.randomUUID()
  player1.join(room)
  player2.join(room)

  io.to(room).emit('matched', room)
}

io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`)
  queue.push(socket)
  match()

  socket.on('message', data => {
    const room = data.room

    if (room)
      io.to(room).emit('message', data)
  })

  socket.on('activity', data => {
    const room = data.room

    if (room)
      socket.broadcast.to(room).emit('activity')
  })

  socket.on('end_turn', data => {
    const room = data.room

    if (room)
      socket.broadcast.to(room).emit('end_turn')
  })

  socket.on('guess', data => {
    const { room, guess } = data

    if (room) {
      socket.broadcast.to(room).emit('guess', guess)
      socket.broadcast.to(room).emit('end_turn')
    }
  })

  socket.on('correct_guess', data => {
    const room = data.room

    if (room)
      socket.broadcast.to(room).emit('correct_guess')
  })

  socket.on('incorrect_guess', data => {
    const room = data.room

    if (room)
      socket.broadcast.to(room).emit('incorrect_guess')
  })

  socket.on('disconnect', () => {
    const index = queue.indexOf(socket)
    if (index !== -1) queue.splice(index, 1)
  })
})