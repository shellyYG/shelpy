require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = __dirname + '/views/';
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use([
  require("./api/routes/helpeeRoute"),
  // require("./server/routes/helperRoute"),
  express.static(path)
]);
app.use(cors());
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));