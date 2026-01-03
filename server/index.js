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
const rooms = {}

function match() {
  while (queue.length >= 2) {
    const player1 = io.sockets.sockets.get(queue.shift())
    const player2 = io.sockets.sockets.get(queue.shift())

    if (!player1 || !player2)
      return

    startGame(player1, player2)
  }
}

function startGame(player1, player2) {
  const room = crypto.randomUUID()
  player1.join(room)
  player2.join(room)

  rooms[room] = { 
    [player1.id]: { selected: null },
    [player2.id]: { selected: null }
  }

  io.to(room).emit('matched', room)
}

io.on('connection', socket => {
  queue.push(socket.id)
  match()

  socket.on('start_game', data => {
    const { selected, room } = data

    if (room)
      rooms[room][socket.id].selected = selected
  })

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
    
    if (!room) return

    const opponentId = Object.keys(rooms[room]).find(id => id !== socket.id)
    const opponentSelected = rooms[room][opponentId].selected

    if (guess === opponentSelected) {
      const selected = rooms[room][socket.id].selected
      const message = { selected: selected, opponentSelected: opponentSelected }

      socket.emit('game_won', message)
      socket.broadcast.to(room).emit('game_lost', message)
    }
    else {
      socket.emit('incorrect_guess')
    }
  })

  socket.on('disconnect', () => {
    const index = queue.indexOf(socket.id)

    if (index !== -1) 
      queue.splice(index, 1)
  })
})