import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { connect } from "react-redux";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



const classes = useStyles();
// getModalStyle is not a pure function, we roll the style only on the first render
const [modalStyle] = React.useState(getModalStyle);
const [open, setOpen] = React.useState(false);

const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

export class RetryPromptModal extends Component {
    render() {
        return (
            <div>
              <button type="button" onClick={handleOpen}>
                Open Modal
              </button>
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
              >
                <div style={modalStyle} className={classes.paper}>
                  <h2 id="simple-modal-title">Text in a modal</h2>
                  <p id="simple-modal-description">
                    Would you like to keep playing?
                  </p>
                  <SimpleModal />
                </div>
              </Modal>
            </div>
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
  

export default connect(mapStateToProps, mapDispatchToProps)(RetryPromptModal)
