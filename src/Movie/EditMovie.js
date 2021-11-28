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



const EditMovie = () => {
  const history = useHistory();
  const location = useLocation();

  
  const classes = useStyles();

  const [details, setDetails] = useState({
    mid: "",
    mname:"",
    cast: "",
    description: "",
    director: ""
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));



  useEffect(async () => {
 
    const docRef = doc(db, "Movie", location.state.row.mid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const userData = { ...data };
      console.log(userData);
      setDetails({ ...userData });
     
      
    } else {
      console.log("No such document!");
    }
  }, []);

  

  const editMovie = () => {
    console.log(details);
    updateDoc(doc(db, "Movie", details.mid), {
      ...details,
    });
  };

  return (
    <Container style={{ height: "100vh" }} minWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Movie Details
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                id="standard-read-only-input"
                label="Email"
                value={details.email}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid> */}

            {/* <Grid item xs={12}>
              <TextField
                id="standard-select-movie-native"
                fullWidth
                label="Movie Id"
                value={movieName}
                SelectProps={{
                  native: true,
                }}
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                id="mname"
                fullWidth
                label="Movie Name"
                value={details.mname}
                onChange={(e) => {
                    setValue(e);
                    console.log(details);
                  }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="cast"
                fullWidth
                label="Movie Cast"
                value={details.cast}
                
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="description"
                fullWidth
                fullHieght
                label="Movie Description"
                value={details.description}
                
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-select-screen-native"
                fullWidth
                label="Movie Directors"
                value={details.director}
                
              ></TextField>
            </Grid>
            
          </Grid>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={editMovie}
          >
            Edit Movie Details
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default EditMovie;
