const path = require('path');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express();
const server = http.createServer(app);
// socketio expects it to be called with raw http server
const io = socketio(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

let count = 0;
let message = "Welcome!";

// io.on('connection', (socket) => { 
//     console.log('New web socket connection') 
//     // sending an event to the client
//     // socket.emit('countUpdated', count)

//     // socket.on('increment', () => {
//     //     count++;
//     //     // socket.emit('countUpdated', count)
//     //     // emitting to every client connection available
//     //     io.emit('countUpdated', count);
//     // })

//     socket.emit('message', message);
//     // send message to everyone that a new user has joined
//     // with broadcast, we can send a message to everyone else except the current client
//     socket.broadcast.emit('clientMessage', 'A new user has joined!');
//     socket.on('sendMessage', (message, callback) => {

//         const filter = new Filter();
//         if (filter.isProfane(message)) {
//             return callback('Profanity is not allowed');
//         }
//         io.emit('clientMessage', message);
//         callback('Delivered')
//     })

//     socket.on('sendLocation', (coords, callback) => {
//         io.emit('clientMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
//         callback();
//     })

//     // a user disconnects
//     socket.on('disconnect', () => {
//         io.emit('clientMessage', 'a user has left');
//     })
// });

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', generateMessage('Welcome!'))
    socket.broadcast.emit('message', generateMessage('A new user has joined!'))

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })


    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'))
    })
})

server.listen(port, () => console.log(`Server listening on port ${port}`));