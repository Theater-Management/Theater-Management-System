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
  table: {
    minWidth: 1500,
  },
}));

const columns = [
  { id: "fname", label: "First Name", minWidth: 200 },
  { id: "lname", label: "Last Name", minWidth: 200 },
  {
    id: "email",
    label: "Email",
    minWidth: 250,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 50,
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

function createData(fname, lname, email, gender, action) {
  return { fname, lname, email, gender, action };
}

const rows = [
  createData(
    "Ayesh",
    "Dissanayaka",
    "ayesh@gmail.com",
    "Male",
    <span>
      <Tooltip title="View" placement="top">
        <a href="/view">
          <IconButton
            aria-label="view"
            size="small"
            style={{ color: "#6a1b9a", backgroundColor: "#e1bee7" }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </a>
      </Tooltip>{" "}
      &nbsp;
      <Tooltip title="Edit" placement="bottom">
        <a href="/edit">
          <IconButton
            aria-label="edit"
            size="small"
            style={{ color: "#00695c", backgroundColor: "#b2dfdb" }}
          >
            <CreateIcon fontSize="small" />
          </IconButton>
        </a>
      </Tooltip>{" "}
      &nbsp;
      <Tooltip title="Delete" placement="right">
        <a href="/delete">
          <IconButton
            aria-label="delete"
            size="small"
            style={{ color: "#ff6f00", backgroundColor: "#ffecb3" }}
          >
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </a>
      </Tooltip>
    </span>
  ),
  createData("Ayoma", "Chathumini", "akatuwawala@gmail.com", "Female"),
  createData("Mark", "Zuckerburg", "mark.123@yahoomail.com", "Male"),
];

const UserList = () => {
  const [details, setDetails] = useState({
    fname: "",
    lname: "",
    gender: "",
    email: "",
    type: "",
  });

  const history = useHistory();

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
            <Button>Admin</Button>
            <Button>Users</Button>
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
                  {rows
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
              count={rows.length}
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
