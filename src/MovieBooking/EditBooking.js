import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

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
const movies = [];

const EditBooking = () => {
  const history = useHistory();
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

  const [currency, setCurrency] = useState("");

  useEffect(async () => {
    const docRef = doc(db, "movieBooking", "rW2WilaNsiQUvq6Okhcb");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const userData = { ...data };
      setDetails({ ...userData });
      getMovieList(userData.mid);
      getMovieName(userData.mid);
      console.log("hello ", movies);
    } else {
      // doc.data() will be undefined in this case

      console.log("No such document!");
    }
  }, []);

  const getMovieName = async (mid) => {
    const docSnap = await getDoc(doc(db, "Movie", mid));
    if (docSnap.exists()) {
      const movie = docSnap.data();
      const movieData = { ...movie };
      console.log(movieData);
      movies.push({
        value: docSnap.data().mid,
        label: docSnap.data().mname,
      });
      setCurrency(docSnap.data().mid);
    } else {
      console.log("No such document!");
    }
  };

  const getMovieList = (mid) => {
    getDocs(query(collection(db, "Movie"), where("mid", "!=", mid))).then(
      (query) => {
        query.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          movies.push({
            value: doc.data().mid,
            label: doc.data().mname,
          });
          console.log("movie list", movies);
        });
      }
    );
  };

  const editBooking = () => {
    console.log(details);
    updateDoc(doc(db, "movieBooking", details.bid), {
      ...details,
    });
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
    console.log("id for movie ", event.target.value);
    setDetails((details) => ({ ...details, mid: event.target.value }));
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
                select
                fullWidth
                label="Movie Id"
                value={currency}
                SelectProps={{
                  native: true,
                }}
                onChange={handleChange}
              >
                {movies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-select-theater-native"
                select
                fullWidth
                label="Theater Id"
                value={details.tid}
              >
                {movies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-select-screen-native"
                select
                fullWidth
                label="screen Id"
                value={details.sid}
              >
                {movies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-select-seat-native"
                select
                fullWidth
                label="seat Id"
                value={Details.seatid}
              >
                {movies.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
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
