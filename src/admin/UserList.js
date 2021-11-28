import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

//firebase
import { db } from "../firebase/firebase";
import { doc } from "firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

//mui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
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
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

function createUserData(uid, email, gender) {
  return { uid, email, gender };
}

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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: { width: "90px" },
  table: {
    minWidth: 1500,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mpaper: {
    backgroundColor: theme.palette.background.paper,
    border: "4px solid #fff000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    width: "600px",
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
  const [nrows, setNrows] = useState([]);
  const [type, setType] = useState("viewer"); //user type
  const [active, setActive] = useState(false);  //admin button active?
  const [array, setArray] = useState([]);

  const deleteUser = async (uid) => {
    const userId = doc(db, "users", uid);
    await deleteDoc(userId);
    window.location.reload(false);
  };

  useEffect(async () => {
    setArray([]);

    const utype = type.toString();
    getDocs(query(collection(db, "users"), where("type", "==", utype))).then(
      (query) => {
        query.forEach((doc) => {
          const uname = doc.data().fname + " " + doc.data().lname;
          // const email = doc.data().email.toLowerCase(); ---- issue
          const email = doc.data().email;

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
                {!active ? (
                  <Tooltip title="Delete" placement="right">
                    <Chip
                      label="Remove User"
                      onClick={() => {
                        deleteUser(doc.id);
                      }}
                      style={{
                        color: "#00695c",
                        backgroundColor: "#b2dfdb",
                      }}
                      icon={<DeleteForeverIcon />}
                    />
                  </Tooltip>
                ) : (
                  <Chip icon={<FaceIcon />} label="User - Admin" />
                )}
              </span>
            )
          );
        });
        setNrows(array);
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
                setType("admin");
                console.log("admin");
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
