import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { AuthContext } from "../firebase/AuthContext";

//  material ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel } from "@material-ui/core";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Link from "@material-ui/core/Link";
import userEvent from "@testing-library/user-event";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    minWidth: 265,
  },
  success: {
    color: "#fff101",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function createMovieData(mid, mname, tid, sid) {
  return { mid, mname, tid, sid };
}
function createData(seatid, status) {
  return { seatid, status };
}

const AddBooking = () => {
  const history = useHistory();
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [array, setArray] = useState([]);
  const user = useContext(AuthContext);
  console.log(user.user.userDetails);

  const [movies, setMovies] = useState([]);
  const [mrows, setMRows] = useState([]);

  const [details, setDetails] = useState({
    bid: "",
    mid: "",
    email: user.user.userDetails.email,
    sid: "",
    tid: "",
    seatid: "",
    uid: user.user.userDetails.uid,
  });

  useEffect(
    async () => {
      setMovies([]);
      getDocs(query(collection(db, "Movie"))).then((query) => {
        query.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          movies.push(
            createMovieData(
              doc.data().mid,
              doc.data().mname,
              doc.data().tid,
              doc.data().sid
            )
          );
        });
        setMRows(movies);
        console.log(movies);
      });
    },
    [details],
    console.log(details)
  );

  const loadSeats = () => {
    setArray([]);
    getDocs(
      query(collection(db, "seat"), where("sid", "==", details.sid))
    ).then((query) => {
      query.forEach((doc) => {
        if (doc.data().status == "available") {
          console.log(doc.id, " => ", doc.data());
          //console.log(doc.id, " => ", doc.data());
          array.push(createData(doc.data().seatid, doc.data().status));
        }
      });
      setRows(array);
      console.log("seats", array);
    });
  };

  //=====================================

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const [open, setOpen] = React.useState(false);

  const handleSubmit = () => {
    console.log(details);

    const bookingdocRef = doc(collection(db, "movieBooking"));

    setDoc(bookingdocRef, {
      bid: bookingdocRef.id,
      mid: details.mid,
      sid: details.sid,
      tid: details.tid,
      email: user.user.userDetails.email,
      uid: user.user.userDetails.uid,
      seatid: details.seatid,
    });

    setOpen(true);
    console.log("created: " + details);

    updateDoc(doc(db, "seat", details.seatid), {
      status: "booked",
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setTimeout(() => {
      console.log("Hello, World!");
    }, 2000);
    history.push("movie-list");
  };

  return (
    <Container style={{ height: "100vh" }} maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MovieFilterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Book A Movie
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.user.userDetails.email}
                onChange={setValue}
                readOnly
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Movie
                </InputLabel>
                <Select
                  id="standard-select-movie-native"
                  select
                  fullWidth
                  name="mid"
                  label="Select a Movie"
                  value={details.mid}
                  onChange={setValue}
                >
                  {mrows.map((movie) => (
                    <option
                      key={movie.mid}
                      value={movie.mid}
                      onClick={() => {
                        details.sid = movie.sid;
                        details.tid = movie.tid;
                        loadSeats();
                        console.log("testing code ", details);
                      }}
                    >
                      {movie.mname}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">
                Select a Seat
              </InputLabel>
              <Select
                id="standard-select-movie-native"
                select
                fullWidth
                name="seatid"
                label="Select a Seat"
                value={details.seatid}
                onChange={setValue}
              >
                {rows.map((seat) => (
                  <option key={seat.seatid} value={seat.seatid}>
                    {seat.seatid}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                bgcolor="error.main"
                className={classes.submit}
                onClick={handleSubmit}
                style={{ backgroundColor: "#00c853" }}
              >
                Book A Seat
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Snackbar
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="New Movie Added Succefully!"
                action={
                  <React.Fragment>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleClose}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default AddBooking;