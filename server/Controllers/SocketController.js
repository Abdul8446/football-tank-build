const socketio = require("socket.io");
const Chat = require("../Models/ChatModel");

module.exports = (http) => {
  const io = socketio(http, {
    path: "/api/socket.io/",
    cors: {
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://football-tank.site",
        "http://www.football-tank.site",
        "https://www.football-tank.site",
        "http://football-tank.site",   
        "http://admin.football-tank.site",
        "https://admin.football-tank.site",
      ],
      methods: ["GET", "POST"],    
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    // Handle events and data from the admin client
    socket.on("userBlocked", (data) => {
      console.log("user blocked message received in server for user :", data);
      // Emit the data to the user client(s)
      io.emit("userBlocked", data);
    });

    //chat room
    socket.on("joinRoom", async (chatroomId) => {
      try {
        socket.join(chatroomId);
        console.log("User joined room: " + chatroomId);
        // Retrieve chat messages from the database and emit them to the client
        const chat = await Chat.findOne({ chatroomid: chatroomId });
        if (chat) {
          socket.emit("output", chat.chats);
        } else {
          console.log(`No chat found for chatroomid: ${chatroomId}`);
          socket.emit("output", { error: "no chat found" });
        }
      } catch (error) {
        console.log(error);
      }
    });

    socket.on(
      "message",
      async ({ chatroomid, username, userid, chattext, timestamp }) => {
        try {
          console.log("massage send " + chattext);
          const doc = await Chat.findOneAndUpdate(
            { chatroomid },
            {
              $push: {
                chats: {
                  username: username,
                  userid: userid,
                  chattext: chattext,
                  timestamp: timestamp,
                },
              },
            },
            { upsert: true, new: true }
          );
          io.to(chatroomid).emit("message", doc.chats);
        } catch (err) {
          console.error(err);
        }
      }
    );

    socket.on("typing", async ({ userdata, chatroomid }) => {
      console.log(`${userdata.name} is typing...in ${chatroomid}`);
      io.to(chatroomid).emit("typing", userdata);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
};
