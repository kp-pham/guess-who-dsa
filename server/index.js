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
    players: {
      [player1.id]: { selected: null },
      [player2.id]: { selected: null }
    }, 
    currentPlayer: player1.id
  }

  io.to(room).emit('matched', room)
}

function setSelected(room, id, selected) {
  rooms[room].players[id].selected = selected
}

function getStartingPlayer(room) {
  const index = Math.floor(Math.random() * 2)
  return Object.keys(rooms[room].players)[index]
}

function getNextPlayer(room, current) {
  return Object.keys(rooms[room].players).find(id => id !== current)
}

io.on('connection', socket => {
  queue.push(socket.id)
  match()

  socket.on('ready', data => {
    const { selected, room } = data

    if (room) {
      const startingPlayer = getStartingPlayer(room)
      setSelected(room, socket.id, selected)
      socket.emit('start_game', startingPlayer)
    }
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

    if (!room)
      return 

    if (socket.id !== rooms[room].currentPlayer)
      return

    socket.broadcast.to(room).emit('end_turn')
    rooms[room].currentPlayer = getNextPlayer(room, socket.id)
  })

  socket.on('guess', data => {
    const { room, guess } = data

     if (!room)
      return

    if (socket.id !== rooms[room].currentPlayer)
      return
    
    const opponentId = Object.keys(rooms[room].players).find(id => id !== socket.id)
    const opponentSelected = rooms[room].players[opponentId].selected

    if (guess === opponentSelected) {
      const selected = rooms[room].players[socket.id].selected
      const message = { selected: selected, opponentSelected: opponentSelected }

      socket.emit('game_won', message)
      socket.broadcast.to(room).emit('game_lost', message)
    }
    else {
      socket.emit('incorrect_guess')
      socket.broadcast.to(room).emit('end_turn')
      rooms[room].currentPlayer = getNextPlayer(room, socket.id)
    }
  })

  socket.on('disconnect', () => {
    const index = queue.indexOf(socket.id)

    if (index !== -1) 
      queue.splice(index, 1)
  })
})