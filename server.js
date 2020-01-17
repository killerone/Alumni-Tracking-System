const http = require("http");
const app = require("./backend/app");
const ChatRoom = require("./backend/models/chatRoom-model");

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = require("socket.io")(server);

io.sockets.on("connection", socket => {
  let joinRoom;
  socket.on("join", data => {
    ChatRoom.find({}).then(rooms => {
      let found = false;
      rooms.forEach(room => {
        if (
          room.participants.includes(data.u1id) &&
          room.participants.includes(data.u2id)
        ) {
          found = true;
          joinRoom = room;
          socket.join(room.id);
          return;
        }
      });

      if (!found) {
        const newRoom = new ChatRoom({
          participants: [data.u1id, data.u2id],
          chat: []
        });
        newRoom.save().then(room => {
          // room.updateOne()
          joinRoom = room;
          socket.join(room.id);
        });
      }
    });
  });

  socket.on("message", data => {
    io.in(joinRoom.id).emit("new message", {
      user: data.name,
      message: data.message
    });
    ChatRoom.updateOne(
      { id: joinRoom.id },
      { $push: { chat: { user: data.name, message: data.message } } }
    ).catch(err => {
      console.log(err);
    });
  });

  socket.on("typing", data => {
    socket.broadcast
      .in(data.room)
      .emit("typing", { data: data, isTyping: true });
  });
});

console.log("Server running at http://localhost:" + port);
server.listen(port);
