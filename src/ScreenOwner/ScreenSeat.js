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

function createData(seatid, status, screenType) {
  return {seatid, status, screenType};
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

const ScreenSeat = () => {
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [screenType, setscreentype] = useState("");
  const [array, setArray] = useState([]);
  useEffect(() => {
    setArray([]);
    getDocs(
      query(
        collection(db, "seat"),
        where("sid", "==", "XwnGcL4e1gqWAIxnyNm5")
      )
    ).then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log("screen id ", doc.data().sid);
        getScreenType(doc.data().sid);
        array.push(createData(doc.data().seatid, doc.data().status, screenType));
      });
      setRows(array);
      console.log(array);
    });
  }, [screenType]);

  const loadSeats = () => {
    setArray([]);
    getDocs(
      query(
        collection(db, "seat"),
        where("sid", "==", "XwnGcL4e1gqWAIxnyNm5")
      )
    ).then((query) => {
      query.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        getScreenType(doc.data().sid);
        array.push(createData(doc.data().seatid, doc.data().status, screenType));
      });
      setRows(array);
      console.log(array);
    });
  };
  //==========================================================
  const getScreenType = (sid) => {
    getDocs(query(collection(db, "users"), where("uid", "==", "XwnGcL4e1gqWAIxnyNm5"))).then(
      (query) => {
        query.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setscreentype(doc.data().screenType);
          console.log("screen is ", screenType);
        });
      }
    );
  };

  //========================================================

  const classes = useStyles();
  // Delete seat
  const deleteSeat = async (seatid) => {
    const docSnap = await getDoc(doc(db, "seat", seatid));
    if (docSnap.exists()) {
      const bs = docSnap.data();
      const bsd = { ...bs };
      console.log("seat id", bsd.seatid);


      deleteDoc(doc(db, "seat", seatid));
      loadSeats();

    } else {
      console.log("Not available!");
    }
  };

  return (
    <Container style={{ height: "100vh", marginTop: 10 }} maxWidth="md">
        <h1>Screen type - Theatre</h1>
        <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => history.push("/addseat")}
                  >
                    Add  a Seat
                  </Button><br/>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Seat Number</TableCell>
              <TableCell align="center">availability</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.name}>
                <TableCell align="center">{row.seatid}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                  // Delete seat button
                  <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        deleteSeat(row.seatid);
                        console.log(row.seatid);
                      }}
                  >
                    Delete
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
export default ScreenSeat;
