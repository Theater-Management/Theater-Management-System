import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
//material Ui
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../firebase/AuthContext";
//firebase
import { db } from "../firebase/firebase";

function createData(bid, email, movie, seatId) {
  return { bid, email, movie, seatId };
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

const BookingList = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  console.log(user.user.userDetails);
  const [rows, setRows] = useState([]);
  const [moviename, setMovieName] = useState("");
  const [array, setArray] = useState([]);

  const [bookid, setBookid] = useState("");
  const [emailadd, setemailadd] = useState("");
  const [seatno, setseatno] = useState("");
  useEffect(() => {
    if (user.user !== "INIT") {
      console.log(user);
      getDocs(
        query(
          collection(db, "movieBooking"),
          where("uid", "==", user.user.userDetails.uid)
        )
      ).then(async (query) => {
        // for (const file of files) {
        //   const contents = await fs.readFile(file, "utf8");
        //   console.log(contents);
        // }

        let arr = [];
        for (const doc of query.docs) {
          setBookid(doc.data().bid);
          setseatno(doc.data().seatid);
          setemailadd(doc.data().email);
          arr.push(await getMovieName(doc.data()));
        }
        setArray(arr);
        setRows(arr);
        // query.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());
        //   console.log("mid id ", doc.data().mid);
        //   console.table(doc.data());
        //   setBookid(doc.data().bid);
        //   setseatno(doc.data().seatid);
        //   setemailadd(doc.data().email);
        //   console.log("seatno ", seatno);
        //   getMovieName(doc.data());

        //   // array.push(
        //   //   createData(
        //   //     doc.data().bid,
        //   //     doc.data().email,
        //   //     moviename,
        //   //     doc.data().seatid
        //   //   )
        //   // );
        //   // setRows(array);
        // });
        // setRows(array);
        console.log(array);
      });
    }
  }, [user]);

  const loadBookings = () => {
    setArray([]);
    getDocs(
      query(
        collection(db, "movieBooking"),
        where("uid", "==", user.user.userDetails.uid)
      )
    ).then((query) => {
      query.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        getMovieName(doc.data().mid);
        array.push(
          createData(
            doc.data().bid,
            doc.data().email,
            moviename,
            doc.data().seatid
          )
        );
      });
      setRows(array);
      console.log(array);
    });
  };
  //==========================================================
  const getMovieName = async ({
    mid,
    bid: bookid,
    email: emailadd,
    seatid: seatno,
  }) => {
    //  getDocs(query(collection(db, "Movie"), where("mid", "==", mid))).then(
    //     (query) => {
    //       query.forEach((doc) => {
    //         console.log(doc.id, " => ", doc.data());
    //         setMovieName(doc.data().mname);
    //         console.log("movie is ", moviename);
    //         array.push(createData(bookid, emailadd, moviename, seatno));
    //         setRows(array);
    //         console.log("array in func ", array);
    //       });
    //     }
    //   );

    const docSnap = await getDoc(doc(db, "Movie", mid));
    if (docSnap.exists()) {
      console.log(" => ", docSnap.data());
      setMovieName(docSnap.data().mname);
      console.log("movie is ", moviename);
      return createData(bookid, emailadd, docSnap.data().mname, seatno);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => console.log(array), [array]);

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
      // loadBookings();
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
              <TableCell align="center">Seat Number</TableCell>
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
                <TableCell align="center">{row.seatId}</TableCell>
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
export default BookingList;
