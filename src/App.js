import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/HomePage";
import MovieList from "./Movie/MovieList";
import Footer from "./OtherPages/Footer";
import NavBar from "./OtherPages/NavBar";
import SignUp from "./Sign Up/SignUp";
import ScreenSignUp from "./admin/screenSignUp";

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
        <Route exact path="/screensignup">
          <ScreenSignUp />
        </Route>
        <Route exact path="/movie-list">
          <MovieList />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
