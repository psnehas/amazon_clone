import './App.css';
import React,{useEffect} from 'react';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Checkout from './Checkout';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {auth} from './firebase';
import {useStateValue} from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe("pk_test_51HwawkCRRmxIqORSkEcyHhM4KupTcOYIe86Lfa8tiDMrNroodjfytITRxEDMH4ItFBoY4efkfIONBf3zsOQ6wXpG005hvOASlk")


function App() {
  const [{},dispatch] = useStateValue();
  useEffect(()=>{
    // as soon as the app loads, we attach this listener/observer that tracks which user logged in/out
    auth.onAuthStateChanged(authUser =>{
      console.log("User is:",authUser);
      if (authUser){
        // the user just logged in/user was already logged in. Google auth uses this feature to log you back in after you close and reopen a tab if you had already logged in.
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      }
      else{
        // the user is logged out.
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  },[])
  return (
    <Router>
      <div className="app">
        
        <Switch>
          <Route exact path="/"> <Header /> <Home /> </Route>
          <Route exact path="/login"><Login /></Route>
          <Route path="/checkout"> <Header /> <Checkout /> </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment /> 
            </Elements>
            
            
          </Route>
          <Route exact path = "/orders"><Orders /></Route>
        </Switch>
        
       
        
       
      </div>
    </Router>
  );
}

export default App;
