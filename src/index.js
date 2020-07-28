const path = require('path');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
// socketio expects it to be called with raw http server
const io = socketio(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

let count = 0;
let message = "Welcome!";

io.on('connection', (socket) => { 
    console.log('New web socket connection') 
    // sending an event to the client
    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++;
    //     // socket.emit('countUpdated', count)
    //     // emitting to every client connection available
    //     io.emit('countUpdated', count);
    // })

    socket.emit('message', message);
    socket.on('sendMessage', message => {
        io.emit('clientMessage', message);
    })
});

server.listen(port, () => console.log(`Server listening on port ${port}`));