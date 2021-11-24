import React, { useState } from "react";
import { useHistory } from "react-router";

//  material ui
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "@material-ui/core/Select";
import { FormControl, InputLabel } from "@material-ui/core";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";

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
  success: {
    color: "#fff101",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AddMovie = () => {
  const history = useHistory();
  const classes = useStyles();

  const [details, setDetails] = useState({
    mnane: "",
    url: "",
    time: "",
    director: "",
    cast: "",
    description: "",
    theatre: "",
    screen: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));
  const handleReset = () => {
    setDetails((details) => ({
      mname: "",
      url: "",
      time: "",
      director: "",
      cast: "",
      description: "",
      theatre: "",
      screen: "",
    }));
  };
  const handleSubmit = () => {
    console.log(details);
    history.push("movie-list");
  };

  return (
    <Container style={{ height: "100vh" }} maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MovieFilterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Movie
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="mname"
                name="mname"
                variant="outlined"
                color={classes.success}
                required
                fullWidth
                id="mname"
                label="Movie Name"
                value={details.mname}
                autoFocus
                onChange={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
              variant="outlined"
                id="date-time"
                label="date-time"
                name="time"
                fullWidth
                type="datetime-local"
                defaultValue="2017-05-24T10:30"
                className={classes.textField}
                value={details.time}
                onChange={setValue}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 1800, // 5 min
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="url"
                label="URL"
                name="url"
                autoComplete="url"
                value={details.url}
                onChange={setValue}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Theatre
                </InputLabel>
                <Select
                  variant="outlined"
                  required
                  label="Theatre"
                  fullWidth
                  value={details.tname}
                  name="tname"
                  id="tname"
                  onChange={setValue}
                >
                  <option aria-label="None" value="" />
                  <option value={details.tid}>Ereana</option>
                  <option value={20}>Sigiri</option>
                  <option value={30}>MaxWell</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">
                  Screen
                </InputLabel>
                <Select
                  variant="outlined"
                  required
                  label="Screen"
                  fullWidth
                  value={details.sname}
                  name="sname"
                  id="sname"
                  onChange={setValue}
                >
                  <option aria-label="None" value="" />
                  <option value={details.sname}>Screen 1</option>
                  <option value={20}>Screen 2</option>
                  <option value={30}>Screen 3</option>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="director"
                label="Deriected By"
                name="director"
                autoComplete="director"
                value={details.director}
                onChange={setValue}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="cast"
                label="Cast"
                name="cast"
                autoComplete="cast"
                value={details.cast}
                onChange={setValue}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={details.description}
                onChange={setValue}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                bgcolor="error.main"
                className={classes.submit}
                onClick={handleSubmit}
                style={{ backgroundColor: "#00c853" }}
              >
                Add Movie
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="warning"
                className={classes.submit}
                onClick={handleReset}
                style={{ backgroundColor: "#f44336" }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default AddMovie;
