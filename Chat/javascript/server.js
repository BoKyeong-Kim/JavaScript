const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("./utils/users");

const app = express();
//socket.io를 사용하려면 직접 액세스해야함
const server = http.createServer(app);
const io = socketio(server);

//정적 폴더 설정 -> 브라우저에서 HTTP를 열면(localhost 3000) index.html 페이지를 볼 수 있음.
//파일이 URL로 연결되도록 경로설정
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";

//클라이언트 연결 실행
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    //실제로 참여해야함
    socket.join(user.room);

    // welcome current user - 실제로 보내고 싶은 메세지
    socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

    // 사용자가 연결할 때의 Broadcast
    socket.broadcast
      .to(user.room)
      .emit(
          "message", 
          formatMessage(botName, `${user.username} has joined the chat`)
        );

       // user와 room에 대한 정보 전송 
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
  });

  // listen to chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // 클라이언트 연결 해제 실행
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if(user) {
        io.to(user.room).emit(
            "message", 
            formatMessage(botName, `${user.username} has left the chat`)    
        );

        // user와 room에 대한 정보 전송 
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    }
  });
});

const PORT = 3000 || process.env.PORT;

//app -> server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
