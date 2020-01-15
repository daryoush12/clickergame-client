import { CREATE_PLAYER, GAME_CONNECT, UPDATE_GAME } from "./Types/action-types";

export function createPlayer(payload) {
  return { type: CREATE_PLAYER, payload}

};


export function createGameConnection(payload){
  return {type: GAME_CONNECT, payload}
}

export function updateGame(payload){
  return {type: GAME_CONNECT, payload}
}