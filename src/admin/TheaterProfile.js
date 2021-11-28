import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import TextField from "@material-ui/core/TextField";

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
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formControl: {
    minWidth: 268,
  },
  head: {
    backgroundColor: theme.palette.primary,
    color: theme.palette.common.white,
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  table: {
    minWidth: 1500,
  },
  root: {
    minWidth: 550,
    borderColor: "#fff101",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const columns = [
  { id: "fname", label: "First Name", minWidth: 150 },
  { id: "lname", label: "Last Name", minWidth: 150 },
  {
    id: "email",
    label: "Email",
    minWidth: 200,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 200,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Delete",
    minWidth: 200,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(fname, lname, email, gender, type, action) {
  return { fname, lname, email, gender, type, action };
}

const rows = [
  createData(
    "India",
    "IN",
    1324171354,
    3287263,
    "ayesh@gmail.com",
    <Tooltip title="Delete" placement="right">
      <IconButton
        aria-label="delete"
        size="small"
        style={{ color: "#e65100", backgroundColor: "#fbe9e7" }}
      >
        <DeleteForeverIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  ),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
];

const TheaterProfile = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    theatrename: "",
    location: "",
    capacity: "",
    type:""
  });
  const history = useHistory();
  const classes = useStyles();
  
  const setValue = (e) =>
  setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
  const [currency, setCurrency] = useState("");

  useEffect(async () => {
  const docRef = doc(db, "users", "Ag9Pyp6uVsU40yHzdwpWdDDb3p33");
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
 
  const bull = <span className={classes.bullet}>•</span>;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container style={{ minHeight: "80vh" }} maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          style={{ backgroundColor: "#fff101", color: "#424242" }}
        >
          <AssignmentInd />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginBottom: "20px" }}
        >
          Theater Profile
        </Typography>
        <div style={{ marginBottom: "40px" }}>
          <br />
          <br />
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                style={{ textAlign: "left" }}
              >
        
            <p><strong>Theater Name:</strong> {details.theatrename}</p>
            <p><strong>Email:</strong> {details.email}</p>
            <p><strong>Password:</strong>  {details.password}</p>
            <p><strong>Location:</strong>  {details.location}</p>
            <p><strong>Capacity: </strong> {details.capacity}</p>
              </Typography>
              
            </CardContent>
            <CardActions></CardActions>
          </Card>
        </div>
      </div>
    </Container>
  );
};
export default TheaterProfile;
