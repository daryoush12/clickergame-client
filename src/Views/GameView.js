import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { createGameConnection, updateGame } from '../Store/Actions'
import socket from '../Components/socket';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export class GameView extends Component {
  constructor() {
    super();
    this.state = {
      Game: false,
      endpoint: "http://127.0.0.1:4001", 
      socket: socket()
    };
    this.onGameUpdated = this.onGameUpdated.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    const { endpoint } = this.state;
    this.state.socket.registerHandler(this.onGameUpdated)
    this.state.socket.join(this.props.Player);
        
  }

 handleClick(e, socket){
    e.preventDefault();
    console.log("Hello");
    socket.sendClick(this.props.Player);
  
    
  }

  //Instead await click to update game for players?
  onGameUpdated(data) {
    this.setState({Game:data})
  }



  render() {
    console.log(this.props);
    console.log(this.state.Game);

    return (
     
       
      <Grid container className = "game-container" spacing={3}>
          
        <Grid item xs={3}>
          <Paper>
          
              <div>
                {" "}
                {this.state.Game.Players.map((player, key) => (
                  <Grid container className="user-container">
                    <Grid className="userCircle" xs = {3}><p className="userCircle-playerLetter">{player.name.charAt(0)}</p></Grid>
                <Grid xs = {4}className="user-name-p" key={key}><p className="test">{player.name}</p><p className="player-score">{player.score} Points</p> </Grid>
                  </Grid>
                ))}
              </div>
            ) : (
              <div>Loading Players..</div>
            )}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper><button onClick={(e) => this.handleClick(e, this.state.socket)}>Click me</button>
            <p>{this.state.Game.clicks}</p>
          </Paper>
        </Grid>
      </Grid>
          
     
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // ... computed data from state and optionally ownProps
  return { ...ownProps, 
     Player: state.Player,
     Connection: state.Connection };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createGameConnection: connection => dispatch(createGameConnection(connection)),
    updateGame: game => dispatch(updateGame(game))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
