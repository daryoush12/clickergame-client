import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { createGameConnection, updateGame } from "../Store/Actions";
import socket from "../Components/socket";
import { ConverseToArray } from "../Components/DataUtil";
import RetryPromptModal from "../Components/RetryPromptModal";
import { removePlayer } from "../Store/Actions";
import Button from '@material-ui/core/Button';

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
      socket: socket()
    };
    this.onGameUpdated = this.onGameUpdated.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.state.socket.registerHandler(this.onGameUpdated);
    this.state.socket.join(this.props.Player);
  }

  handleClick(e, socket) {
    e.preventDefault();
    console.log("Hello");
    socket.sendClick(this.props.Player);
  }

  handleRestart(e, socket) {
    e.preventDefault();
    socket.resetPlayer(this.props.Player);
  }

  handleQuit(e, socket){
    e.preventDefault();
    localStorage.clear();
    socket.leave(this.props.Player);
    this.props.removePlayer(this.props.Player);
  }

  testConversion(dict) {
    for (var key in dict) {
      var value = dict[key];
    }
  }

  //Instead await click to update game for players?
  onGameUpdated(data) {
    this.setState({ Game: data });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    const LoopablePlayer = ConverseToArray(this.state.Game.Players);
    // {this.state.Game.Players.keys.map((keyx, key) => (<p key={key}>{this.state.Game.Players[keyx]}</p>))}
   return this.state.Game ?
     (
      <div>
          <Grid container className="game-container" spacing={3}>
            <Grid item xs={3}>
              <Paper>
                <div>
                  {LoopablePlayer.map((item, key) => (
                   
                    <Grid container className="user-container">
                      <Grid className="userCircle" xs={3}>
                        <p className="userCircle-playerLetter">
                          {item.name.charAt(0).toUpperCase()}
                        </p>
                      </Grid>
                      {item.id == this.props.Player.id ? 
                      <Grid xs={4} className="user-name-p" key={key}>
                        <p className="test">You</p>
                        <p className="player-score">{item.score} Points</p>{" "}
                      </Grid>: <Grid xs={4} className="user-name-p" key={key}>
                        <p className="test">{item.name}</p>
                        <p className="player-score">{item.score} Points</p>{" "}
                      </Grid>}
                    </Grid>
                      
                  ))}
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className="game-canvas">
                {this.state.Game.Players[this.props.Player.id].score < 1 ? 
                  <div>
                    <p className="prompt-txt">Would you like to try again?</p>
                    <button className="prompt-bt"
                      onClick={e => this.handleRestart(e, this.state.socket)}
                    >
                      Yes
                    </button>
                    <button className="prompt-bt" onClick = {e => this.handleQuit(e, this.state.socket)} >No</button>
                  </div>
                 : (
                  <div>
                    <h2 className="score-txt">Total clicks {this.state.Game.clicks}</h2>
                    <Button variant="contained" className="game-bt"
                      onClick={e => this.handleClick(e, this.state.socket)}
                    >
                      Click me
                    </Button>
                    
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
         
        
      </div>
    ) : <div>Loading.</div>
}
}

const mapStateToProps = (state, ownProps) => {
  // ... computed data from state and optionally ownProps
  return { ...ownProps, Player: state.Player, Connection: state.Connection };
};

const mapDispatchToProps = dispatch => {
  return {
    createGameConnection: connection =>
      dispatch(createGameConnection(connection)),
      updateGame: game => dispatch(updateGame(game)),
      removePlayer: player => dispatch(removePlayer(player))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameView);
