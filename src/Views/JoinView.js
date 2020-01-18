import React, { Component } from "react";
import { render } from "react-dom";

import { createPlayer } from "../Store/Actions";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { FormControl, FormGroup } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: 200,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export class JoinView extends Component {

  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  onFormSubmit = () => {

    var Player = {"name":"", "id":""};

    const uuidv1 = require("uuid/v1");

    Player.name = this.state.name;
    Player.id = uuidv1();

    this.props.createPlayer(Player);
  }

  setPlayerName = (e) => {
    console.log(e.target.value);
    this.setState({name: e.target.value});

  }



  render() {
    console.log(this.props);
   // console.log(this.props.Player);
    return (
      <Grid spacing={3} container
      direction="row"
      justify="center"
      alignItems="flex-end" >
        <Grid item xs={4} container justify="center" alignItems="center" className="joinview-container">
          <Paper className="join-paper">
          
      
         
            
              <FormHelperText id="my-helper-text">
                <p>
                  Choose your destiny
                </p>
                
              </FormHelperText>
              <TextField id="filled-basic" value = {this.state.name} onChange={this.setPlayerName} label="Playername" variant="filled" />

             

              <Button variant="contained" className ="join-button" onClick={this.onFormSubmit} color="primary">
               Join
              </Button>

             
          
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // ... computed data from state and optionally ownProps
  return { ...ownProps, Player: state.Player };
};

const mapDispatchToProps = dispatch => {
  return {
    createPlayer: player => dispatch(createPlayer(player))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinView);
