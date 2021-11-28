import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from "react-router";
import React, {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase/firebase";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Details} from "@material-ui/icons";
import Button from "@material-ui/core/Button";

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

//==========NEW========================
const users = [];

const EditUsers = () => {
    const history = useHistory();
    const classes = useStyles();

    const [details, setDetails] = useState({
        email: "",
        uid: "",
        fname: "",
        lname: "",
        gender: "",
        password: "",
        type: "",
    });

    const setValue = (e) =>
        setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
    const [currency, setCurrency] = useState("");

    useEffect(async () => {
        const docRef = doc(db, "users", "5C8QPRQ2rjxoUw6hjLJj");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const userData = { ...data };
            setDetails({ ...userData });
            users.push({
                value: docSnap.data().email,
                label: docSnap.data().uid,
            });
            console.log(users);
            setCurrency(docSnap.data().email);
        } else {
            // doc.data() will be undefined in this case

            console.log("No such document!");
        }
    }, []);

    const seedetails = () => {
        console.log(details);
    };

    return (
        <Container style={{ height: "100vh" }} maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edit Users
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
                                label="User ID"
                                value={details.uid}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-first-name-input"
                                label="First Name"
                                value={details.fname}
                                fullWidth
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-last-name-input"
                                label="Last Name"
                                value={details.lname}
                                fullWidth
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-gender-input"
                                label="Gender"
                                value={details.gender}
                                fullWidth
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                value={details.password}
                                fullWidth
                                InputProps={{
                                    readOnly: false,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-password-type"
                                label="Type"
                                value={details.type}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={seedetails}
                    >
                        Edit Booking
                    </Button>
                </form>
            </div>
        </Container>
    );
};
export default EditUsers;