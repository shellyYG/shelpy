require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = __dirname + '/views/';
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const socketChat = require('./api/controllers/chatController');

const io = new Server(server, {
  cors: {
    origin: 'https://shelpy.co', // Develop: http://localhost:3000
    methods: ['GET', 'POST'],
  },
});
io.on('connection', socketChat);

const PORT = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use([
  require('./api/routes/route'),
  express.static(path)
]);
app.use(cors());
app.get("/*", function (req, res) {
  res.sendFile(path + "index.html");
});

// app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

server.listen(PORT, () => {
  console.log(`Socket server listening to port ${PORT}`);
});
