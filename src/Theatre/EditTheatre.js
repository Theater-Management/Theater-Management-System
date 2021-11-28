import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../firebase/AuthContext";

//firebase
import { auth, db } from "../firebase/firebase";
import { makeStyles } from "@material-ui/core/styles";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import TheatersIcon from "@material-ui/icons/Theaters";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
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
const EditTheatre = () => {
  const history = useHistory();
  const classes = useStyles();
  const user = useContext(AuthContext);
  const [details, setDetails] = useState({
    tname: "",
    location: "",
    capacity: "",
    email: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  useEffect(async () => {
    const docRef = doc(db, "users", user.user.userDetails.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data);
      const userData = { ...data };
      setDetails({
        tname: data.tname,
        location: data.location,
        capacity: data.capacity,
        email: data.email,
      });

      console.log("usern: " + details.tname);
      console.log("uid-:"+user.user.userDetails.uid);
    } else {
      console.log("No such document!");
    }
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleUpdate = () => {
    console.log(details);
    
    //==============================
    // Signed in
    const userId = user.user.userDetails.uid;
    updateDoc(doc(db, "users", userId), {
        tname: details.tname,
      location: details.location,
      capacity: details.capacity,
      email: details.email,
      type: "theatre",
    });

 
    setOpen(true);
    console.log("created: " + details);
    //==============================
   
    //------------------------------------------------------
  };



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setTimeout(() => {
        console.log('Hello, World!')
      }, 1000);
      history.push("theatrehome");
  };

  return (
    <Container style={{ height: "100vh" }} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TheatersIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Theatre Profile Update
        </Typography>
        <br />
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="theatrename"
                name="tname"
                variant="outlined"
                required
                fullWidth
                id="tname"
                label="Threatre Name"
                value={details.tname}
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
            <Tooltip title="Cannot edit your email" placement="right">
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
                  readOnly
                />
              </Grid>
            </Tooltip>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Theatre Profile Updated!"
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
          <Grid container justifyContent="flex-end"></Grid>
        </form>
      </div>
    </Container>
  );
};
export default EditTheatre;
