import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
//firebase
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  getDoc,
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

function createData(mid, mname,cast,description,director) {
  return { mid, mname,cast,description,director};
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

const MovieListToEdit = () => {
  const history = useHistory();
  const [rows, setRows] = useState([]);
 
  const [array, setArray] = useState([]);

//   const [screenType, setScreenType] = useState("");
  useEffect(() => {
    setArray([]);
    getDocs(
      query(
        collection(db, "Movie")
      )
    ).then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        // console.log("sid id ", doc.data().sid);
        // getScreenType(doc.data().sid);
        array.push(createData(doc.data().mid, doc.data().mname,doc.data().cast,doc.data().description,doc.data().director));
      });
      setRows(array);
      console.log(array);
    });
  }, []);

//   const getScreenType = (sid) => {
//     getDocs(query(collection(db, "users"), where("uid", "==", sid))).then(
//       (query) => {
//         query.forEach((doc) => {
//           console.log(doc.id, " => ", doc.data());
//           setScreenType(doc.data().screenType);
//           console.log("screen", screenType);
//         });
//       }
//     );
//   };
  const loadBookings = () => {
    setArray([]);
    getDocs(
      query(
        collection(db, "Movie")
      )
    ).then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        // getScreenType(doc.data().sid);
        array.push(createData(doc.data().mid, doc.data().mname,doc.data().cast,doc.data().description,doc.data().director));
      });
      setRows(array);
      console.log(array);
    });
  };




  const classes = useStyles();



  return (
    <Container style={{ height: "100vh", marginTop: 10 }} maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">MOVIE</TableCell>
              <TableCell align="center">CAST</TableCell>
              <TableCell align="center">DESCRIPTION</TableCell>
              <TableCell align="center">DIRECTOR</TableCell>
              {/* <TableCell align="center">SCREEN TYPE</TableCell> */}
              <TableCell align="center">Edit</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.name}>
                <TableCell align="center">{row.mname}</TableCell>
                <TableCell align="center">{row.cast}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.director}</TableCell>
                {/* <TableCell align="center">{row.screenType}</TableCell> */}
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      history.push({
                        pathname: "/editmovie",
                        state: { row },
                      })
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default MovieListToEdit;
