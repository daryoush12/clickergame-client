import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";
import JoinView from './Views/JoinView'
import GameView from './Views/GameView'
import { connect } from "react-redux";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    return (
      <div className="page">
        <div className="Header"><h2 className="app-title">Clicking Game Application</h2></div>
        {this.props.Player != undefined ? <GameView></GameView> : <JoinView></JoinView>}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // ... computed data from state and optionally ownProps
  return({...ownProps, "Player": state.Player, hasSubmitted: state.hasSubmitted});
}
export default connect(mapStateToProps)(App);
