import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
