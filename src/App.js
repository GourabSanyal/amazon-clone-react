import React from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home"
import Checkout from "./Checkout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login";

function App() {
  return (
    //BEM
    <Router>
      <div className="App">
        <Header />
        <Switch>
          {/* Login Page */}
          <Route path="/login">
            <Login />
          </Route>
          {/* Checkout Path */}
          <Route path="/checkout">
            <Checkout />
          </Route>

          {/* Home Path */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>

    </Router>
  );
}

export default App;
