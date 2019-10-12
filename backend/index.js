const express = require('express')
//const WebSocketServer = require('websocket').server;
//const http = require('http');
const app = express()
const port = 3001
const bodyParser = require('body-parser')

let werewolves = require('./routes/werewolves');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.json());
app.use('/werewolves', werewolves);
app.use('/site/',express.static('dist'));
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

/*wsServer = new WebSocketServer({
  httpServer: server
});*/
