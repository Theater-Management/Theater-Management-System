import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

//firebase
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
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
const ScreenAddSeat = () => {
    const history = useHistory();
    const classes = useStyles();
  
    const [details, setDetails] = useState({
      sid: "",
      seatid: "",
      status:"",
     
    });
  
    const setValue = (e) =>
      setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
  
    const handleSubmit = () => {
      console.log(details);
       const sesid="XwnGcL4e1gqWAIxnyNm5";

      setDoc(doc(db, "seat",details.seatid), {
        sid: sesid,
        seatid:details.seatid,
        status:"available",
      });
      console.log("created");
        history.push("screenseat");
       
        
};
return (
    <Container style={{ height: "100vh" }} >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Seat
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container >
            <Grid item xs={12}>
              <TextField
                autoComplete="seatid"
                name="seatid"
                variant="outlined"
                required
                
                id="seatid"
                label="Enter a Seat Number"
                value={details.seatid}
                autoFocus
                onChange={setValue}
                inputProps={{ maxLength: 12 }}
              />
              <p> if number already exists, seat will not create.</p>
            </Grid>
          </Grid>
          <Button
            
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default ScreenAddSeat;
