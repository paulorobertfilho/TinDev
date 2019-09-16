const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes.js')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3333;

const connectedUsers = {}

io.on('connection', socket => {
  const { user } = socket.handshake.query
  connectedUsers[user] = socket.id
  console.log('Client connectet:', user)

})

mongoose
  // .connect("mongodb+srv://adminbox:adminbox@cluster0-jxsc8.mongodb.net/tindev?retryWrites=true&w=majority",
  .connect("mongodb://localhost:27017/tindev",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers

  return next()
})


app.use((req, res, next) => {
  req.io = io
  req.connectedUsers = connectedUsers

  return next()
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(PORT, function () {
  console.log('listening on *:' + PORT);
});
