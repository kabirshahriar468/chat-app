const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');


const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');
const PORT = process.env.PORT || 5000;
const router = require('./router');


const app= express();
const server = http.createServer(app);
// const io = socketio(server);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
    console.log('New WebSocket connection established');
    socket.on('join', ({ name, room },callback) => { 

        const { error, user } = addUser({ id: socket.id, name, room }); // ✅ Fix: Pass socket.id as ID
        if (error) {
            return callback(error); // ✅ Fix: Return error to the client
        }
         // ✅ Fix: Join the room
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}.` }); // ✅ Fix: Send welcome message to the new user
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` }); // ✅ Fix: Notify others in the room
        socket.join(user.room);

        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
        callback(); // ✅ Fix: Call callback when done
    });

    socket.on('sendMessage', (message, callback) => { // ✅ Fix: Ensure the function sends a message
        const user = getUser(socket.id); // ✅ Fix: Get the user by socket ID
        if (!user) {
          console.warn(`User not found for socket.id = ${socket.id}`);
          return callback('User not found');
        }
      
        io.to(user.room).emit('message', { user: user.name, text: message });
        callback();
      
        // ✅ Fix: Call callback when done
    } );

    socket.on('disconnect', () => {
      const user =removeUser(socket.id);
      if(user){
        io.to(user.room).emit('message',{user:'admin',text: `${user.name} has left.`})
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
      }

    });
}   );

app.use(router);
app.use(cors({ origin: 'http://localhost:3000' }));

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});