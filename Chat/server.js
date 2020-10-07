const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');

const app = express();
//socket.io를 사용하려면 직접 액세스해야함
const server = http.createServer(app);
const io = socketio(server);

//정적 폴더 설정 -> 브라우저에서 HTTP를 열면(localhost 3000) index.html 페이지를 볼 수 있음.
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

//클라이언트 연결 실행
io.on('connection', socket=> {
    //console.log('New Web Socket Connection...');

    // welcome current user - 실제로 보내고 싶은 메세지 
    socket.emit('message', formatMessage(botName,'Welcome to ChatCord!'));

    // 사용자가 연결할 때의 Broadcast
    socket.broadcast.emit('message', formatMessage(botName,'A user has joined the chat'));

    // 클라이언트 연결 해제 실행
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName,'A user has left the chat'));
    })

    // listen to chatMessage 
    socket.on('chatMessage', msg => {
    io.emit('message', formatMessage('USER',msg));
    })

});


const PORT = 3000 || process.env.PORT;

//app -> server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
