import express from 'express'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500

const app = express()
const devDist = path.join(__dirname, "../client/dist")
app.use(express.static(fs.existsSync(devDist) ? devDist : path.join(__dirname, "dist")))

const expressServer = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`)
})

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? false : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  }
})

const queue = []
const rooms = {}

io.on('connection', socket => {
  queue.push(socket.id)
  match()

  socket.on('ready', data => {
    const { selected, room } = data

    if (!roomExists(room)) return
    if (!roomRegistered(room)) return
    if (!playerInRoom(room, socket.id)) return

    const startingPlayer = getStartingPlayer(room)
    setSelected(room, socket.id, selected)
    socket.emit('start_game', startingPlayer)
  })

  socket.on('message', data => {
    const room = data.room

    if (!roomExists(room)) return
    if (!roomRegistered(room)) return
    if (!playerInRoom(room, socket.id)) return

    io.to(room).emit('message', data)
  })

  socket.on('activity', data => {
    const room = data.room

    if (!roomExists(room)) return
    if (!roomRegistered(room)) return
    if (!playerInRoom(room, socket.id)) return
    
    socket.broadcast.to(room).emit('activity')
  })

  socket.on('end_turn', data => {
    const room = data.room

    if (!roomExists(room)) return 
    if (!roomRegistered(room)) return
    if (!playerInRoom(room, socket.id)) return
    if (!validTurn(room, socket.id)) return

    socket.broadcast.to(room).emit('end_turn')
    rooms[room].currentPlayer = getNextPlayer(room, socket.id)
  })

  socket.on('guess', data => {
    const { room, guess } = data

    if (!roomExists(room)) return
    if (!roomRegistered(room)) return
    if (!playerInRoom(room, socket.id)) return
    if (!validTurn(room, socket.id)) return
    
    const opponentId = Object.keys(rooms[room].players).find(id => id !== socket.id)
    const opponentSelected = rooms[room].players[opponentId].selected

    if (guess === opponentSelected) {
      const selected = rooms[room].players[socket.id].selected
      const message = { selected: selected, opponentSelected: opponentSelected }
      
      socket.emit('game_won', message)
      socket.broadcast.to(room).emit('game_lost', message)
    }
    else {
      socket.emit('incorrect_guess', guess)
      socket.broadcast.to(room).emit('end_turn')
      rooms[room].currentPlayer = getNextPlayer(room, socket.id)
    }
  })

  socket.on('leave_game', () => {
    socket.emit('leave_game')
    queue.push(socket.id)
    match()
  })

  socket.on('disconnect', () => {
    const index = queue.indexOf(socket.id)

    if (index !== -1) 
      queue.splice(index, 1)

    const room = Object.keys(rooms).find(room => socket.id in rooms[room].players)

    if (!roomExists(room)) 
      return

    const opponentId = Object.keys(rooms[room].players).find(id => id !== socket.id)

    if (opponentConnected(opponentId))
      io.to(opponentId).emit('opponent_disconnected')

    delete rooms[room]
  })
})

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

function roomExists(room) {
  return Boolean(room)
}

function roomRegistered(room) {
  return room in rooms
}

function playerInRoom(room, player) {
  return player in rooms[room].players
}

function validTurn(room, player) {
  return player === rooms[room].currentPlayer
}

function opponentConnected(opponentId) {
  return opponentId && io.sockets.sockets.get(opponentId)
}