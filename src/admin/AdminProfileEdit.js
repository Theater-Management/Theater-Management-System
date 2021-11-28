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
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel } from "@material-ui/core";

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

const AdminProfileEdit = () => {
  const history = useHistory();
  const user = useContext(AuthContext);
  const classes = useStyles();

  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    type: "",
    uid: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  useEffect(async () => {
    const docSnap = await getDoc(doc(db, "users", user.user.userDetails.uid));
    console.log("details of admin ", user.user.userDetails);
    if (docSnap.exists()) {
      const udata = docSnap.data();
      const userData = { ...udata };
      console.log("booking seat id", userData);
      setDetails({ ...userData });
      console.log(details);
    } else {
      console.log("No such document!");
    }
  }, []);

  return (
    <Container style={{ height: "100vh" }} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Admin Profile
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="fname"
                label="First Name"
                value={details.fname}
                autoFocus
                onChange={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                value={details.lname}
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
                disabled
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
                disabled
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
            onClick={() => {
              updateDoc(doc(db, "users", details.uid), {
                ...details,
              });
            }}
          >
            Edit
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default AdminProfileEdit;
