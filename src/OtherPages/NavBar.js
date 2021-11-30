import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getAuth, signOut } from "firebase/auth";

//material Ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();
  const history = useHistory();

  const handlesignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            TMS
          </Typography>

          <div className={classes.grow} />

          <div className={classes.root}>
            <Button
              style={{ color: "white" }}
              onClick={() => history.push("/movie-list")}
            >
              Movie List
            </Button>

            <Button
              style={{ color: "white" }}
              onClick={() => history.push("/")}
            >
              Home
            </Button>
            <Button
              style={{ color: "white" }}
              onClick={() => history.push("/signup")}
            >
              Sign Up
            </Button>
            <Button
              style={{ color: "white" }}
              onClick={() => {
                handlesignOut();
              }}
            >
              Sign Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;
