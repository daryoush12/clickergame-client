import { CREATE_PLAYER, GAME_CONNECT } from "../Actions/Types/action-types";

const initialState = {
    GameInstance: {},
    Player: null,
    hasSubmitted: false,
    Connection: null
  };

function rootReducer(state = initialState, action) {
    if(action.type === CREATE_PLAYER){ 
      return {...state, Player:action.payload, hasSubmitted: true};
    }
    if(action.type === GAME_CONNECT){ 
      return {...state, Connection: action.payload};
    }
    return {...state};
};



export default rootReducer;