const express = require('express');
const WebSocketServer = require('websocket').server;

let router = express.Router()

router.get('/test', test);
router.get('/init', init);
router.post('/joinGame', joinGame);
router.post('/startGame', startGame);

/*
  Order of ops:
  test
  init
  joinGame
  startGame
*/

module.exports = router;

let gameboard = {};
let users = [];
let userStates = {};
/*
  {
    userName:
    role: //villager, wolf, alpha, witchdoctor, etc.
    vote: //current round's vote
    color: //a color to color the text
 }
*/

function test(req, res){
  console.log('got to test');
  return res.send({status:"success", message: "test!"});
}

function init(req, res){
  console.log('got to init');
  users = [];
  userStates = {};
  gameboard = {};
  return res.send({status:"success"});
}

function joinGame(req, res){
  console.log('got to joinGame');
  if(users.includes(req.body.userName)){
    console.log(`User ${req.body.userName} already exists and cannot be added to the game!`)
    return res.status(400).send({status: "failure", message: `User ${req.body.userName} already exists and cannot be added to the game!`})
  }

  users.push(req.body.userName);
  //create new userState:
  userStates[req.body.userName] = {
    userName: req.body.userName,
    role: undefined,
  }
  return res.send({status: "success"});
}

function roleRandomizer(wolves, villagers){
  let roleArray = [];
  for(let i=0; i<wolves; i++){roleArray.push("wolf")}
  for(let i=0; i<villagers; i++){roleArray.push("villager")}

  let userCopy = JSON.parse(JSON.stringify(users));
  userCopy.sort(() => Math.random() - 0.5);
  console.log("userCopy: ");
  console.log(userCopy);
  userCopy.forEach(function(u, i){
    userStates[u].role = roleArray[i];
  });

  console.log("userStates: ");
  console.log(userStates);
}

function startGame(req, res){
  console.log('got to startGame');

  //check settings
  if(req.body.wolfCount + req.body.villagerCount >users.length){
    return res.send({status: "failure", message: "The number of villagers and wolves are greater than total users"});
  }

  if(req.body.wolfCount + req.body.villagerCount <users.length){
    req.body.villagerCount = users.length - req.body.wolfCount;
  }

  //assign roles, (simple for now)
  roleRandomizer();

  //init gameboard
  gameboard.round = 0;
  gameboard.activeUsers = users;
  gameboard.deadUsers = [];
  gameboard.wolfCount = req.body.wolfCount;
  gameboard.villagerCount = req.body.villagerCount;
  return res.send({status: "success"});
}
