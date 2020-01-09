import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";
import Rooms from "./Components/Rooms";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';

class App extends Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => this.setState({ response: data }));
    socket.on("Rooms", data => this.setState({ rooms: data }));
  }
  render() {
    console.log(this.state.rooms);
    const { response } = this.state;
    return (
      <div>
        <Grid className = "content" container spacing={3}>
          <Grid item xs={6}>
            <Button variant="contained" color="primary">
              new room
            </Button>
          </Grid>
          <Grid item xs={6}>
            <p>Sir Cootys</p>
          </Grid>
          <Grid item xs={12}>
            <div className="room-list">
              <Rooms rooms={this.state.rooms}></Rooms>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
