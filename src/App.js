import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/HomePage";
import MovieList from "./Movie/MovieList";
import EditBooking from "./MovieBooking/EditBooking";
import BookingList from "./MovieBooking/BookingList";
import Footer from "./OtherPages/Footer";
import NavBar from "./OtherPages/NavBar";

import ScreenSignUp from "./admin/ScreenSignUp";
import ScreenView from "./Screen/ScreenView";
import SignUp from "./Sign Up/SignUp";

import ScreenSeatBooked from "./ScreenOwner/ScreenSeatBooked";



import UserList from "./admin/UserList";
import ScreenEdit from "./Screen/ScreenEdit";
import TheaterProfile from "./admin/TheaterProfile";

import EditTheatre from "./Theatre/EditTheatre";

import MovieListToEdit from "./admin/MovieListToEdit";


import AdminSignUp from "./Sign Up/AdminSignUp";
import ScreenHome from "./ScreenOwner/ScreenHome";
import TheatreSignUp from "./admin/TheatreSignUp";
import AddBooking from "./MovieBooking/AddBooking";
import EditMovie from "./Movie/EditMovie";



import ScreenAddSeat from "./ScreenOwner/ScreenAddSeat";
import ScreenSeat from "./ScreenOwner/ScreenSeat";
import TheatreHome from "./theatreHome/ThreatreHome";
import AddMovie from "./Movie/AddMovie";





import EditUsers from "./admin/EditUsers";

import AdminProfileEdit from "./admin/AdminProfileEdit";
import AdminHome from "./admin/AdminHome";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/adminsignup">
          <AdminSignUp />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>

        <Route exact path="/theatrehome">
          <TheatreHome />
        </Route>

        <Route exact path="/theatresignup">
          <TheatreSignUp />
        </Route>

        <Route exact path="/screensignup">
          <ScreenSignUp />
        </Route>

        <Route exact path="/movie-list">
          <MovieList />
        </Route>
        <Route exact path="/editmovie">
          <EditMovie />
        </Route>
        <Route exact path="/screenhome">
          <ScreenHome />
        </Route>
        <Route exact path="/addbooking">
          <AddBooking />
        </Route>
        <Route exact path="/addseat">
          <ScreenAddSeat />
        </Route>
        <Route exact path="/screenseat">
          <ScreenSeat />
        </Route>
        <Route exact path="/screenseatbooked">
          <ScreenSeatBooked />
        </Route>
        <Route exact path="/movieeditlist">
          <MovieListToEdit />
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
<<<<<<< HEAD
</Route>
=======
        </Route>
>>>>>>> 8de561c2fb88efdc3fc6c7c7d7cebd75f7418c18
        <Route exact path="/edit-theatre">
          <EditTheatre />
        </Route>
        <Route exact path="/edit-users">
          <EditUsers />


</Route>
        


        <Route exact path="/view-bookings">
          <BookingList />
        </Route>
        <Route exact path="/edit-admin">
          <AdminProfileEdit />
        </Route>

        <Route exact path="/admin-home">
          <AdminHome />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
