import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../firebase/AuthContext";
//firebase
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

//material Ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Container from "@material-ui/core/Container";
import { Button, Grid, Modal } from "@material-ui/core";

import { Search } from "@material-ui/icons";

// const columns = [
//   { id: "screenId", label: "ScreenID", minWidth: 170 },
//   { id: "email", label: "Email", minWidth: 170 },
//   { id: "type", label: "Type", minWidth: 70 },
//   { id: "movies", label: "Movies", minWidth: 70 },
// ];

function createData(screenId, email, type) {
  return { screenId, email, type };
}
function createMovieData(mid, mname, tid) {
  return { mid, mname, tid };
}

const useStyles = makeStyles((theme) => ({
  table: {
    margin: "auto",
  },
  modal: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

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

const ThreatreHome = () => {
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const user = useContext(AuthContext);
  console.log(user.user.userDetails);
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray([]);
    getDocs(query(collection(db, "users"), where("type", "==", "screen"))).then(
      (query) => {
        query.forEach((doc) => {
          if (doc.data().tid == user.user.userDetails.tid) {
            console.log(doc.id, " => ", doc.data());
            array.push(
              createData(
                doc.data().sid,
                doc.data().email,
                doc.data().screentype
              )
            );
          }
        });
        setRows(array);
        console.log(array);
      }
    );
  }, []);

  const [select, setSelect] = useState();
  //==========================================

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //-------------------------------Modal-------------------------------------------
  const [mrows, setMRows] = useState([]);
  const [marray, setMArray] = useState([]);

  const loadMovieList = (sid) => {
    setMArray([]);
    setMRows([]);
    getDocs(query(collection(db, "Movie"), where("sid", "==", sid))).then(
      (query) => {
        query.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          marray.push(
            createMovieData(doc.data().mid, doc.data().mname, doc.data().tid)
          );
        });
        console.log(marray);
        setMRows(marray);
        handleOpen(true);
      }
    );
  };

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.modal}>
      <h2 id="simple-modal-title">Movie List</h2>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">MovieId</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Delete from Screen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mrows.map((row) => (
              <TableRow hover key={row.name}>
                <TableCell align="center">{row.mid}</TableCell>
                <TableCell align="center">{row.mname}</TableCell>

                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      deleteDoc(doc(db, "Movie", row.mid), {
                        sid: "",
                      });
                      handleClose();
                      loadMovieList(select);
                      handleOpen();
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  //----------------------------------------------------------------------------
  return (
    <Container style={{ height: "100vh", marginTop: 10 }} maxWidth="md">
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/edit-theatre")}
      >
        Edit Theatre
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => history.push("/add-movie")}
      >
        Add Movie
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ScreenID</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center"> MOVIES</TableCell>
              <TableCell align="center">REMOVE SCREEN MOVIE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.name}>
                <TableCell align="center">{row.screenId}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      loadMovieList(row.screenId);
                      setSelect(row.screenId);
                    }}
                  >
                    VIEW MOVIES
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      loadMovieList(row.screenId);
                      setSelect(row.screenId);
                    }}
                  >
                    DELETE MOVIE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </Container>
  );
};
export default ThreatreHome;
