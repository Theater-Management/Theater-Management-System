import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/HomePage";
import MovieList from "./Movie/MovieList";
import EditBooking from "./MovieBooking/EditBooking";
import Footer from "./OtherPages/Footer";
import NavBar from "./OtherPages/NavBar";
import ScreenSignUp from "./admin/ScreenSignUp";
import ScreenView from "./Screen/ScreenView";
import SignUp from "./Sign Up/SignUp";
import AddMovie from "./Movie/AddMovie";
import UserList from "./admin/UserList";
import ScreenEdit from "./Screen/ScreenEdit";
import TheaterProfile from "./admin/TheaterProfile";

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

        <Route exact path="/add-movie">
          <AddMovie />
        </Route>
        <Route exact path="/user-list">
          <UserList />
        </Route>
       
        <Route exact path="/screen-list">
          <ScreenView />
        </Route>
        <Route exact path="/edit-booking">
          <EditBooking />
        </Route>
        <Route exact path="/edit-screen">
          <ScreenEdit />
        </Route>
        <Route exact path="/theater-profile">
          <TheaterProfile />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
