import React, {useEffect}from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home"
import Checkout from "./Checkout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login";
import {auth} from './firebase'
import {useStateValue} from './StateProvider'

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the component loades

    auth.onAuthStateChanged(authUser => {
      console.log('the user is >>>', authUser);

      if(authUser) {
        // the user just logged in or was logged in

        dispatch({
          type: 'SET_USER',
          user:authUser
        })

      } else{
        // the user is logged out

        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  })

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
