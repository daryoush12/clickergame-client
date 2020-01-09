import React, { Component } from "react";
import Room from "./Room";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bold"
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 300
  }
});

export class Rooms extends Component {
  render() {
    console.log(this.props.rooms);

    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Room name</StyledTableCell>
              <StyledTableCell align="center">State</StyledTableCell>
              <StyledTableCell align="center">Players</StyledTableCell>
              <StyledTableCell align="center">#</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rooms != undefined ? (
              this.props.rooms.map((room, key) => (
                <TableRow key={key}>
                  <TableCell component="th" scope="row">
                    {room.name}
                  </TableCell>
                  <TableCell align="center">{room.state}</TableCell>
                  <TableCell align="center">{room.players.length}</TableCell>
                  <TableCell align="center">
                    {" "}
                    <Button variant="contained" color="primary">
                      Join
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div>Empty</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default Rooms;
