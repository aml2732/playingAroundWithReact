import React, { Component } from 'react';
//import './Werewolves.css';


function testButton(){
    console.log('test clicked!');
    fetch('http://localhost:3000/werewolves/test')
    .then((result) => result.json())
    .then(function(json){
      console.log('test result: ')
      console.log(json)
    })
    .catch(function(err){
      console.log(`an error occurred while fetching werewolves/test ${err}`);
    })
}

class Werewolves extends Component {
  constructor(props){
    super(props);
    this.state = {userName: ""};
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:3000/werewolves/init');
  }


  //<button onClick={testButton}>test</button>
  handleUserNameChange(){
    this.setState({userName: event.target.value});
  }

  handleJoinGame(){
    console.log('clicked joinGame');
    console.log(`submitting: ${this.state.userName}`);
    fetch('http://localhost:3000/werewolves/joinGame',{
      method: 'POST',
      body: JSON.stringify({userName: this.state.userName})
    })
    .then((result) => result.json())
    .then(function(json){
      console.log('call came back:');
      console.log(json)
    })
    .catch(function(err){
      console.log('an error occurred while trying to join game.')
    });
  }

  render() {
    return (
      <div className="Werewolves">
        <h1>Werewolves</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
        <hr/>
        <input type="text" id="userNameInput" onChange={this.handleUserNameChange} value={this.state.userName}/>
        <button onClick={this.handleJoinGame}>Join game</button>
        <hr/>
        <h2>Settings</h2>
        <p>Only one person per group needs to enter settings here and click the following button.</p>
        <button>Start New Game</button>
      </div>
    );
  }
}

export default Werewolves;
