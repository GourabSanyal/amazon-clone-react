import React, {useEffect} from "react";
import './App.css';
import Header from "./Header";
import Home from "./Home"
import Checkout from "./Checkout"
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./Login";
import {auth} from './firebase'
import {useStateValue} from './StateProvider';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51JAbmoSJaBt33xWELObvoTMTTgWeyVHMopHFUY52hN6PLYjTzeWyMxhkpo8u4exugVTegjTMj2CkJz0bV7nsNynC00XfWvagmb");

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
  }, [])

  return (
    //BEM
    <Router>
      <div className="app">
        <Header />
        <Switch>
          {/* Order Page */}
          <Route path="/Orders">
            <Orders />
          
          </Route>

          <Route path="/login">
            <Login />
          
          </Route>
          {/* Checkout Path */}
          <Route path="/checkout">
            <Checkout />
          </Route>

        <Route path="/payment">
          <Elements stripe={promise}>
          <Payment />
          </Elements>
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
