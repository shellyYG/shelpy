require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = __dirname + '/views/';
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const socketChat = require('./api/controllers/chatController');
const PORT = process.env.PORT || 9000;
const isDeveloping = 0; // TODO before push to ec2
const originURL = isDeveloping ? 'http://localhost:3000' : 'https://shelpy.co';

const io = new Server(server, {
  cors: {
    origin: originURL,
    methods: ['GET', 'POST'],
  },
});
io.on('connection', socketChat);

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1); // This enables IP to show so that we can rate limit individual IP rather than on every IP

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
