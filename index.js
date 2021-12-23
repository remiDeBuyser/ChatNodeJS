const express = require('express');
const app = express().use(express.static(__dirname+'/public/'));
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/public/', (req, res) =>{
    res.sendFile(__dirname+'/public/index.html');
});

var nbPers = 0

io.sockets.on('connection', (socket) => {
    nbPers++;
    io.sockets.emit('nbpers', {nbpers: nbPers})
    socket.on('disconnect', () => {
        nbPers--;
        io.sockets.emit('nbpers', {nbpers: nbPers})
    });
});

http.listen(port, () =>{
    console.log('socketio server run at http://localhost:'+port)
});