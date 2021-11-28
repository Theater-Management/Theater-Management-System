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
  setDoc,
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

const AddBooking = () => {
    const history = useHistory();
    const location = useLocation();
  
    const [seats, setSeats] = useState("");
    const classes = useStyles();
  
    const [details, setDetails] = useState({
      bid: "",
      email: "",
      mid: "",
      tid: "",
      sid: "",
      uid:"",
      seatid: "",
    });

    const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
    const detailpass1="8CVKQ8889DOtlPCXRCbz";
    const detailpass2="8CVKQ8889DOtlPCXRCbz";
    const detailpass3="8CVKQ8889DOtlPCXRCbz";
    const detailauth="8CVKQ8889DOtlPCXRCbz";
    const handleSubmit = () => {
        console.log(details);
    // const detailpass1=location.state.row.mid;
    // const detailpass2=location.state.row.tid;
    // const detailpass3=location.state.row.sid;
    // const detailauth=location.state.row.uid;
    
        setDoc(doc(db, "moviebooking", doc().id), {
          bid: details.bid,
          email: details.email,
          mid: detailpass1,
          tid: detailpass2,
          sid: detailpass3,
          uid:detailauth,
          seatid: details.seatid,
        });
        setDoc(doc(db, "seat", doc().id), {
            seatid: details.seatid,
            status: "booked",
            sid:details.sid,
          });
        history.push("movie-list");
      };
     
      useEffect(async () => {
        setSeats([]);
        const docRef = doc(db, "Movie", detailpass1);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const userData = { ...data };
          console.log(userData);
          setDetails({ ...userData });
        //   getScreenType(userData.sid);
        //   getTheaterName(userData.tid);
    
        //   getDocs(
        //     query(collection(db, "seat"), where("sid", "==", userData.sid))
        //   ).then((query) => {
        //     query.forEach((doc) => {
        //       if (doc.data().status == "available") {
        //         seat.push({
        //           label: doc.data().seatid,
        //           value: doc.data().seatid,
        //         });
        //       }
        //     });
        //     setSeats(details.seatid);
        //   });
    
          //======================================
          console.log("seats in useeffect ", seats);
        } else {
          console.log("No such document!");
        }
      }, []);
      return (
        <Container style={{ height: "100vh" }} maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
               Movie Booking
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="standard-read-only-input"
                    label="Email"
                    
                    fullWidth
                    
                  />
                </Grid>
    
                <Grid item xs={12}>
                  <TextField
                    id="standard-select-movie-native"
                    fullWidth
                    label="Movie Name"
                    value={detailpass1}
                    SelectProps={{
                      native: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-select-theater-native"
                    fullWidth
                    label="Theater Name"
                    value={detailpass2}
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
                    label="Screen Name"
                    value={detailpass3}
                    InputProps={{
                      readOnly: true,
                    }}
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-select-screen-native"
                    fullWidth
                    label="User Name"
                    value={detailauth}
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
                    {/* {seat.map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))} */}
                  </NativeSelect>
                </Grid>
              </Grid>
    
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                // onClick={editBooking}
              >
                Seat book
              </Button>
            </form>
          </div>
        </Container>
      );
    };
    export default AddBooking;
    
     