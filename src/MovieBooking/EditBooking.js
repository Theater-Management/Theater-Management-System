import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

//firebase
import { auth, db } from "../firebase/firebase";
import { doc } from "firebase/firestore";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

//mui
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Details } from "@material-ui/icons";
import { NativeSelect, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//==========NEW========================
const seat = [];

const EditBooking = () => {
  const history = useHistory();
  const location = useLocation();

  const [seats, setSeats] = useState("");
  const classes = useStyles();

  const [details, setDetails] = useState({
    bid: "",
    email: "",
    uid: "",
    tid: "",
    sid: "",
    mid: "",
    seatid: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const [screen, setScreen] = useState("");

  const [movieName, setmovieName] = useState("");

  const [prevseatid, setPrevSeatId] = useState("");

  useEffect(async () => {
    setSeats([]);
    const docRef = doc(db, "movieBooking", location.state.row.bid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const userData = { ...data };
      console.log(userData);
      setDetails({ ...userData });
      getMovieName(userData.mid);

      setPrevSeatId(userData.seatid);
      //=====================================

      getDocs(
        query(collection(db, "seat"), where("sid", "==", userData.sid))
      ).then((query) => {
        query.forEach((doc) => {
          if (doc.data().status == "available") {
            seat.push({
              label: doc.data().seatid,
              value: doc.data().seatid,
            });
          }
        });
        setSeats(details.seatid);
      });

      //======================================
      console.log("seats in useeffect ", seats);
    } else {
      console.log("No such document!");
    }
  }, []);

  const getMovieName = async (mid) => {
    const docSnap = await getDoc(doc(db, "Movie", mid));
    if (docSnap.exists()) {
      const movie = docSnap.data();
      const movieData = { ...movie };
      console.log(movieData);
      setmovieName(docSnap.data().mname);
    } else {
      console.log("No such document!");
    }
  };

  const editBooking = () => {
    console.log(details);
    updateDoc(doc(db, "movieBooking", details.bid), {
      ...details,
    });
    updateDoc(doc(db, "seat", details.seatid), {
      status: "booked",
    });
    updateDoc(doc(db, "seat", prevseatid), {
      status: "available",
    });
  };

  return (
    <Container style={{ height: "100vh" }} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Booking
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="standard-read-only-input"
                label="Email"
                value={details.email}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="standard-select-movie-native"
                fullWidth
                label="Movie Id"
                value={movieName}
                SelectProps={{
                  native: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-select-theater-native"
                fullWidth
                label="Theater Id"
                value={details.tid}
                InputProps={{
                  readOnly: true,
                }}
                readOnly
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-select-screen-native"
                fullWidth
                label="screen Id"
                value={details.sid}
                InputProps={{
                  readOnly: true,
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <NativeSelect
                value={details.seatid}
                onChange={(e) => {
                  setValue(e);
                  console.log(details);
                }}
                name="seatid"
                fullWidth
                className={classes.selectEmpty}
                inputProps={{ "aria-label": "age" }}
              >
                <option value={details.seatid}>{details.seatid}</option>
                {seat.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </NativeSelect>
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={editBooking}
          >
            Edit Booking
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default EditBooking;
