require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const path = __dirname + '/views/';
const app = express();
const cors = require('cors');
const { Server } = require('socket.io');


const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React server
    methods: ["GET", "POST"],
  }
})
io.on("connection", (socket)=>{
  console.log(`User ${socket.id} conneted...`);
  socket.on('join_room', (roomId) =>{
    socket.join(roomId);
  })
  socket.on('send_message', (data) => {
    socket.to(data.room).emit("server_send_message", data); // emit to others except self
  })
  socket.on('disconnect', (data) =>{
    console.log(`User ${socket.id} disconnected.`);
  })
});

const PORT = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use([
  require("./api/routes/helpeeRoute"),
  // express.static(path)
]);
app.use(cors());
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

server.listen(PORT, ()=>{
  console.log(`Socket server listening to port ${PORT}`);
})