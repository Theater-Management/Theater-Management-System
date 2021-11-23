import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
//firebase
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";

//material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { signInWithEmailAndPassword } from "@firebase/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage:
      "url(https://th.bing.com/th/id/R.942388a50a7ba32ee8439e083d89c725?rik=iDZJivlOzE59nw&riu=http%3a%2f%2ffreedesignfile.com%2fupload%2f2015%2f10%2fCinema-movie-vector-background-graphics-09.jpg&ehk=3e9qyVS%2b%2fFQm%2b4LI%2fKwwSu9xN%2bVBWePQHkx2iLf7lF4%3d&risl=&pid=ImgRaw&r=0)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const HomePage = () => {
  const history = useHistory();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
  const addUser = () => {};

  //============================
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        // Signed in
        //----------------------------------------------------------------
        const user = userCredential.user;
        console.log(user.uid);
        getDoc(doc(db, "users", user.uid)).then((doc) => {
          switch (doc.data().type) {
            case "viewer":
              history.push("/movie-list");
              break;
            case "theater":
              history.push("/theater");
              break;
            case "screen":
              history.push("/screen");
              break;
            case "admin":
              history.push("/admin-panel");
              break;
            default:
              history.push("/");
              break;
          }
        });
        //----------------------------------------------------------------

        //-------------------------------------------------------
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            //setEmailError(err.message);
            break;
          case "auth/wring-password":
            //setPasswordlError(err.message);
            break;
          default:
            history.push("/");
            break;
        }
      });
  };

  //=============================

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={setValue}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={setValue}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Button color="primary" onClick={() => history.push("/signup")}>
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default HomePage;
