const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const appPort = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send(`
    <h1 color="orange">Chat room server :D</h1>
    <h2 color="lightyellow">access not allowed</h2>
  `);
});

const socketServer = new Server(server,{
  cors: {
    origin: 'http://localhost:3000',
    methods: [
      'GET',
      'POST',
    ],
  },
});

var currentChatRoom = '';
const allUsers = [];

socketServer.on('connection', (socket) => {
  console.log(`[+] User connected with socketId ${socket.id}`)

  socket.on('join_room', (data) => {
    const { username, room } = data;
    const joinedAt = Date.now();
    const roomChatBotName = 'Pillu Bot 🐱';

    console.log(`[+] Joining user ${username} into room ${room}`);

    socket.join(room);

    socket.to(room).emit('receive_message', {
      message: `${username} has joined the chat room, welcome to ${room} 🚪, meow!!`,
      username: roomChatBotName,
      joinedAt,
    });

    socket.emit('receive_message', {
      message: `Here starts a great conversation, meow!!, Welcome ${username}`,
      username: roomChatBotName,
      joinedAt,
    });

    currentChatRoom = room;

    allUsers.push({
      id: socket.id,
      username,
      room,
    });

    const currentRoomUsers = allUsers.filter((user) => user.room === room);

    socket.to(room).emit('chatroom_users', currentRoomUsers);
    socket.emit('chatroom_users', currentRoomUsers);
  })
});

server.listen(
  appPort,
  () => {
    console.log(`[+] Server is runnning on port ${appPort}`);
    console.log(`[+] Server is running at http://localhost:${appPort}/`)
  }
);
