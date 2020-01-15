import React, { Component } from 'react'
import { connect } from "react-redux";


export class Game extends Component {

    render() {
        Console.log(this.state);
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    // ... computed data from state and optionally ownProps
    return { ...ownProps, 
       Player: state.Player,
       Connection: state.Connection };
  };
  

export default connect(mapStateToProps)(Game)
