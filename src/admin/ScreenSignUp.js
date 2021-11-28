import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

//firebase
import { auth, db } from "../firebase/firebase";
import { doc, setDoc ,getDocs, getFirestore,
  collection,
  query,
  where
 } from "firebase/firestore";
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

function createTheatreData(tid, tname) {
  return { tid, tname };
}


const ScreenSignUp = () => {
  const history = useHistory();
  const classes = useStyles();

  const [theatres, setTheatres] = useState([]);
  const [mrows, setMRows] = useState([]);


  const [details, setDetails] = useState({
    email: "",
    password: "",
    screentype: "",
    noOfSeats:"",
    tid:"",
    type:"",
  });

  useEffect(async () => {
    console.log("theatre:- ");
    setTheatres([]);
    getDocs(
      query(collection(db, "users"), where("type", "==", "theatre"))
    ).then((query) => {
      query.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        theatres.push(createTheatreData(doc.data().tid, doc.data().tname));
      });
      setMRows(theatres);
      //console.log(theatres[0].tid + " "+ theatres.length);
    });
   
  }, []);


  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
    

  const handleSubmit = () => {
    history.push("user-list");
   
    createUserWithEmailAndPassword(auth, details.email, details.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(details);

        setDoc(doc(db, "users", user.uid), {
          sid: user.uid,
          email: details.email,
          password: details.password,
          screentype:details.screentype,
          tid:details.tid,
          noOfSeats:details.noOfSeats,
          type: "screen"
        });
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    //------------------------------------------------------
  };
  return (
    <Container style={{ height: "100vh" }} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="screentype"
                label="screentype"
                type="screentype"
                id="screentype"
                value={details.screentype}
                autoComplete="screentype"
                onChange={setValue}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                variant="outlined"
                required
                select
                label="theater"
                fullWidth
                value={details.tid}
                name="tid"
                id="tid"
                onChange={setValue}
              >
                {mrows.map((theatre) => (
                    <option key={theatre.tid} value={theatre.tid}>
                      {theatre.tname}
                    </option>
                  ))}

              </Select>
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="noOfSeats"
                label="noOfSeats"
                type="noOfSeats"
                id="noOfSeats"
                value={details.noOfSeats}
                autoComplete="noOfSeats"
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
         
        </form>
      </div>
    </Container>
  );
};
export default ScreenSignUp;
