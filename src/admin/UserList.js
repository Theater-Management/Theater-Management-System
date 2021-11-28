import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

//firebase
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//mui
import Avatar from "@material-ui/core/Avatar";
import { Fab } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PeopleIcon from "@material-ui/icons/People";
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
import CreateIcon from "@material-ui/icons/Create";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

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
  button: { width: "90px" },
  table: {
    minWidth: 1500,
  },
}));

const columns = [
  { id: "uname", label: "User Name", minWidth: 250 },
  {
    id: "email",
    label: "Email",
    minWidth: 300,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 250,
    align: "center",
  },
];

function createData(uname, email, gender, action) {
  return { uname, email, gender, action };
}

const UserList = () => {
  const history = useHistory();
  const [nrows, setNrows] = useState([]);
  const [type, setType] = useState("viewer");
  const [active, setActive] = useState(false);
  const [array, setArray] = useState([]);

  const deleteUser = async (uid) => {
    console.log("uers--> " + uid);
    const userId = doc(db, "users", uid);
    await deleteDoc(userId);
    window.location.reload(false);
  };

  useEffect(async () => {
    setArray([]);
    //let utype = type.toString();
    const utype = type.toString();
    console.log("user: " + type);
    getDocs(query(collection(db, "users"), where("type", "==", utype))).then(
      (query) => {
        query.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const uname = doc.data().fname + " " + doc.data().lname;

          // const email = doc.data().email.toLowerCase();
          const email = doc.data().email;

<<<<<<< HEAD
          //const email = doc.data().email.toLowerCase();
        

=======
>>>>>>> 4d7de1fb9228c3099f11801c46e0d540bb9c38a0
          const toTitleCase = (phrase) => {
            return phrase
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          };

          let result = toTitleCase(uname);

          array.push(
            createData(
              result,
              email,
              doc.data().gender,
              <span>
                <Tooltip title="View" placement="top">
                  <Button
                    size="small"
                    onClick={() => history.push("/view")}
                    style={{ color: "#6a1b9a", backgroundColor: "#e1bee7" }}
                    className={classes.button}
                    startIcon={<MoreHorizIcon />}
                  >
                    View
                  </Button>
                </Tooltip>{" "}
                &nbsp;
                <Tooltip title="Delete" placement="right">
                  <Button
                    size="small"
                    onClick={() => {
                      deleteUser(doc.id);
                    }}
                    style={{ color: "#00695c", backgroundColor: "#b2dfdb" }}
                    className={classes.button}
                    startIcon={<DeleteForeverIcon />}
                  >
                    Remove
                  </Button>
                </Tooltip>
              </span>
            )
          );
        });
        setNrows(array);
        //console.log(array);
      }
    );
  }, [type]);

  const classes = useStyles();
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
          style={{ backgroundColor: "#e65100" }}
        >
          <PeopleIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{ marginBottom: "20px" }}
        >
          View Users
        </Typography>
        <div style={{ marginBottom: "40px" }}>
          <ButtonGroup
            color="black"
            style={{ color: "#bf360c" }}
            aria-label="outlined secondary button group"
          >
            <Button
              variant="contained"
              color={active ? "primary" : "light"}
              onClick={() => {
                setActive(true);
                setType("screen");
                console.log("screen");
              }}
            >
              Admin
            </Button>
            <Button
              variant="contained"
              color={active ? "dark" : "primary"}
              onClick={() => {
                setActive(false);
                setType("viewer");
                console.log("viewer");
              }}
            >
              Users
            </Button>
          </ButtonGroup>
          <br />
          <br />
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundColor: "#bf360c",
                          color: "white",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nrows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={nrows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </Container>
  );
};
export default UserList;
