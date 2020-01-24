import socketIOClient from "socket.io-client";

export default function () {

  //https://clicker-server-dare.herokuapp.com
  const socket = new socketIOClient('localhost:4000', {'force new connection': true});

  function registerHandler(onGameUpdate) {
    socket.on('GameInstance', onGameUpdate)
  }

  function unregisterHandler() {
   // socket.off('message')
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function register(Player) {
    socket.emit('register', Player)
  }

  function join(Player) {
    socket.emit('join', Player)
  }

  function leave(Player) {
    socket.emit('leave', Player)
  }

  function sendClick(Player) {
    socket.off('Click');
    socket.emit('Click', Player)
    socket.off('Click');
  }

  function resetPlayer(Player){
    socket.off('Click');
    socket.emit('ResetPlayer', Player)
    socket.off('Click');
  }

 
  function getAvailableUsers(Player) {
    socket.emit('availableUsers', Player)
  }

  return {
    register,
    join,
    leave,
    sendClick,
    resetPlayer,
    registerHandler,
    unregisterHandler
  }
}