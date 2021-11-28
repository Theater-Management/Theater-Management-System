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


const ScreenEdit = () => {
  const history = useHistory();
  const classes = useStyles();


  const [details, setDetails] = useState({

    email: "",
    password: "",
    screentype: "",
    noOfSeats:"",
    theatre:"",
  });



  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
  const [currency, setCurrency] = useState("");

  useEffect(async () => {
    const docRef = doc(db, "users", "yy05taYUhCOFWx0Ii4PNaJ8I7Cp2");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const userData = { ...data };
      setDetails({ ...userData });
      setCurrency(docSnap.data().email);
    } else {
      // doc.data() will be undefined in this case

      console.log("No such document!");
    }
  }, []);

  const editdetails = () => {
    console.log(details);
    history.push("user-list");
    updateDoc(doc(db, "users", "yy05taYUhCOFWx0Ii4PNaJ8I7Cp2"), {
        ...details
      });
  };

  return (
    <Container style={{ height: "100vh" }} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Screen
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
                id="standard-read-only-input"
                label="password"
                value={details.password}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
              <TextField
                id="standard-read-only-input"
                fullWidth
                label="theater"
                value={details.theatre}
                InputProps={{
                    readOnly: true,
                  }}
              />
                
            </Grid>
            <Grid item xs={12}>
              <TextField
                 required
                 fullWidth
                 name="noOfSeats"
                 label="noOfSeats"
                 type="noOfSeats"
                 id="noOfSeats"
                 value={details.noOfSeats}
                 autoComplete="noOfSeats"
                 onChange={setValue}
              > 
              </TextField>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={editdetails}
          >
            Edit Screen
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default ScreenEdit;
