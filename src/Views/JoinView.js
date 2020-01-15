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
}));

export class JoinView extends Component {
  onFormSubmit(data) {
    const uuidv1 = require("uuid/v1");

    data.id = uuidv1();

    this.props.createPlayer(data);
  }

  setPlayerName(e) {
    console.log(e.target.value);
  }

  constructor() {
    super();
    this.state = {
      formData: ""
    };
  }

  render() {
    console.log(this.props);
    console.log(this.props.Player);
    return (
      <Grid spacing={3} container
      direction="row"
      justify="center"
      alignItems="flex-end" >
        <Grid item xs={4} justify="center" alignItems="center" className="joinview-container">
          <Paper>
          
      
            <FormControl>
              <FormGroup>
              <FormHelperText id="my-helper-text">
                Fill out some information before joining game..
              </FormHelperText>

              <TextField
               style={{ margin: 8 }}
                label="Playername"
                id="standard-full-width"
                helperText="Some important text"
                margin="normal"
                variant="outlined"
                fullWidth
                onChange={this.setPlayerName}
              />

              <Button variant="contained" color="primary">
                Primary
              </Button>

              </FormGroup>
            </FormControl>
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
