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

function createData(bid, email, movie) {
  return { bid, email, movie };
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

const ScreenView = () => {
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [moviename, setMovieName] = useState("");
  const [array, setArray] = useState([]);
  useEffect(() => {
    setArray([]);
    getDocs(
      query(
        collection(db, "movieBooking"),
        where("uid", "==", "5pC4kWUIw9hqxBeER9j4XShSJ1u2")
      )
    ).then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log("mid id ", doc.data().mid);
        getMovieName(doc.data().mid);
        array.push(createData(doc.data().bid, doc.data().email, moviename));
      });
      setRows(array);
      console.log(array);
    });
  }, [moviename]);

  const loadBookings = () => {
    setArray([]);
    getDocs(
      query(
        collection(db, "movieBooking"),
        where("uid", "==", "5pC4kWUIw9hqxBeER9j4XShSJ1u2")
      )
    ).then((query) => {
      query.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        getMovieName(doc.data().mid);
        array.push(createData(doc.data().bid, doc.data().email, moviename));
      });
      setRows(array);
      console.log(array);
    });
  };
  //==========================================================
  const getMovieName = (mid) => {
    getDocs(query(collection(db, "Movie"), where("mid", "==", mid))).then(
      (query) => {
        query.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          setMovieName(doc.data().mname);
          console.log("movie is ", moviename);
        });
      }
    );
  };

  //========================================================

  const classes = useStyles();

  const deletebooking = async (bid) => {
    const docSnap = await getDoc(doc(db, "movieBooking", bid));
    if (docSnap.exists()) {
      const booking = docSnap.data();
      const bookingData = { ...booking };
      console.log("booking seat id", bookingData.seatid);
      //========================
      updateDoc(doc(db, "seat", bookingData.seatid), {
        status: "available",
      });

      deleteDoc(doc(db, "movieBooking", bid));
      loadBookings();
      //=========================
    } else {
      console.log("No such document!");
    }
  };

  return (
    <Container style={{ height: "100vh", marginTop: 10 }} maxWidth="md">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">BookingID</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Movie</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow hover key={row.name}>
                <TableCell align="center">{row.bid}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.movie}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() =>
                      history.push({
                        pathname: "/edit-booking",
                        state: { row },
                      })
                    }
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      deletebooking(row.bid);
                      console.log(row.bid);
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
export default ScreenView;
