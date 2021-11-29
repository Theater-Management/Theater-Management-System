import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../firebase/AuthContext";

//firebase
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//mui
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
import { blue } from "@material-ui/core/colors";
import { ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundColor: "#e9f2fa",
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

const AdminHome = () => {
  const history = useHistory();
  const user = useContext(AuthContext);

  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    type: "",
    uid: "",
  });
  const classes = useStyles();
  useEffect(async () => {
    const docSnap = await getDoc(doc(db, "users", user.user.userDetails.uid));
    if (docSnap.exists()) {
      const udata = docSnap.data();
      const userData = { ...udata };
      // console.log("booking seat id", userData);
      setDetails({ ...userData });
      console.log(details);
    } else {
      console.log("No such document!");
    }
  }, []);
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        component={Paper}
        elevation={6}
        square
      >
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Admin Profile
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  value={details.fname}
                  autoFocus
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="lname"
                  value={details.lname}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={details.email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={details.password}
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} className={classes.image}>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="contained"
        >
          <Button onClick={() => history.push("/edit-admin")}>
            Edit Profile
          </Button>
          <Button onClick={() => history.push("/movieeditlist")}>
            Edit Movies
          </Button>
          <Button onClick={() => history.push("/screen-list")}>
            Screen List
          </Button>
          {/* <Button onClick={history.push("/edit-admin")}>Theater List</Button> */}
          <Button onClick={() => history.push("/theatresignup")}>
            Theater Sign Up
          </Button>
          <Button onClick={() => history.push("/screensignup")}>
            Screen Sign Up
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
export default AdminHome;
