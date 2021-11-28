import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
//firebase
import { auth, db } from "../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
// import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
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
const TheatreSignUp = () => {
  const history = useHistory();
  const classes = useStyles();

  const [details, setDetails] = useState({
    theatrename: "",
    location: "",
    capacity: "",
    email: "",
    password: "",
    type: "",
    tid: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    console.log(details);

    console.log(details);
    //===============================
    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
// =========================================
        setDoc(doc(db, "users", user.uid), {
          theatrename: details.theatrename,
          location: details.location,
          capacity: details.capacity,
          email: details.email,
          password: details.password,
          type: "theatre",
          tid: user.uid,
        });

        console.log("created");
        history.push("/theatrehome");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  //==============================

  //------------------------------------------------------

  return (
    <Container style={{ height: "100vh" }} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Theatre Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="theatrename"
                name="theatrename"
                variant="outlined"
                required
                fullWidth
                id="theatrename"
                label="Threatre Name"
                value={details.theatrename}
                autoFocus
                onChange={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                autoComplete="location"
                value={details.location}
                onChange={setValue}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="capacity"
                label="capacity"
                name="capacity"
                autoComplete="capacity"
                value={details.capacity}
                onChange={setValue}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={details.email}
                autoComplete="email"
                onChange={setValue}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={details.password}
                autoComplete="current-password"
                onChange={setValue}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end"></Grid>
        </form>
      </div>
    </Container>
  );
};
export default TheatreSignUp;

 //   const docSnap = await getDoc(doc(db, "seat", seatid));
  //   if (docSnap.exists()) {
  //     const bs = docSnap.data();
  //     const bsd = { ...bs };
  //     console.log("seat id", bsd.seatid);
      

  //     deleteDoc(doc(db, "seat", seatid));
  //     loadSeats();
  //     //=========================
  //   } else {
  //     console.log("No such document!");
  //   }
  // };
