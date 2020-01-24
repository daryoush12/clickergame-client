import { CREATE_PLAYER, GAME_CONNECT, UPDATE_GAME, REMOVE_PLAYER, RESET_APP } from "./Types/action-types";

export function createPlayer(payload) {
  return { type: CREATE_PLAYER, payload}

};

export function removePlayer(payload) {
  return { type: REMOVE_PLAYER, payload}
};

export function resetApp() {
  return {type: RESET_APP};
};


export function createGameConnection(payload){
  return {type: GAME_CONNECT, payload}
}

export function updateGame(payload){
  return {type: GAME_CONNECT, payload}
}