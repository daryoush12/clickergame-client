import React from "react";

function Room(room) {
  return (
    <tr>
      <td>{room.name}</td>
      <td>{room.state}</td>
      <td>{room.players.length}</td>
    </tr>
  );
}

export default Room;
