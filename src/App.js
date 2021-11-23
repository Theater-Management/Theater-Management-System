import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/HomePage";
import MovieList from "./Movie/MovieList";
import EditBooking from "./MovieBooking/EditBooking";
import Footer from "./OtherPages/Footer";
import NavBar from "./OtherPages/NavBar";

import ScreenView from "./Screen/ScreenView";
import SignUp from "./Sign Up/SignUp";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/movie-list">
          <MovieList />
        </Route>
        <Route exact path="/screen-list">
          <ScreenView />
        </Route>
        <Route exact path="/edit-booking">
          <EditBooking />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
