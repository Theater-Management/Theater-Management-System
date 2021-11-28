import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from "react-router";
import React, {useEffect, useState, useContext} from "react";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Details} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { AuthContext } from "../firebase/AuthContext";


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


const EditUsers = () => {
    const history = useHistory();
    const classes = useStyles();
    const user = useContext(AuthContext);

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

    useEffect(async()=>{
        const docSnap = await getDoc(doc(db,"users", user.user.userDetails.uid));
        if (docSnap.exists()) {
            const udata = docSnap.data();
            const userData = { ...udata };
            console.log("booking seat id", userData);
            setDetails({...userData})
            console.log(details)
        } else {
            console.log("No such document!");
        }},[]
    )


    return (
        <Container style={{ height: "100vh" }} maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Edit User Profile
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
                        onClick={()=>{
                            updateDoc(doc(db, "users", details.uid), {
                                ...details
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
export default EditUsers;