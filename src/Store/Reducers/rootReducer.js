import { CREATE_PLAYER, GAME_CONNECT, REMOVE_PLAYER, RESET_APP } from "../Actions/Types/action-types";

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
    if(action.type === REMOVE_PLAYER){ 
      return {...state, Player:null, hasSubmitted: false};
    }
    if(action.type === RESET_APP){ 
      return {initialState};
    }
    if(action.type === GAME_CONNECT){ 
      return {...state, Connection: action.payload};
    }

 
    return {...state};
};



export default rootReducer;