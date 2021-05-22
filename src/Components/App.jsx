import React, { useState } from 'react'
import EventCalendar from './EventCalendar';
import Login from './Login'
import SignUp from './Signup'
// import ToolBar from './ToolBar'
import {
  BrowserRouter as Router,
  Route} from "react-router-dom";
// import axios from 'axios';

// axios.create({baseURL: "http://localhost:8081" // the url of our server
// })

export default function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState('')
  const [userEvents, setUserEvents] = useState([]);

  function handleLogin(){
    setLogged(!logged)
  }

  function handleUser(user){
    setUser(user)
  }

  function handleLogout(){
    setLogged(!logged)
    setUser('')
  }

  function getUser(){
    return user;
  }

  function handleEvents(events){
    // for (let i = 0; i < events.length; i++) {
      setUserEvents(oldArray => [...oldArray, events])
    // }
  }

  function getEvents(){
    return userEvents;
  }

    return (
      <Router>
          <Route exact path="/" render={(props) => (
            <EventCalendar {...props} logged={logged} logout={handleLogout} user={getUser} userEvents= {getEvents()}/>
          )}/>
          <Route exact path="/login" render={(props) => (
            <Login {...props} changeLogging = {handleLogin} handleUser = {handleUser} handleEvents={handleEvents}/>
          )}/>
          <Route exact path="/signup" render={(props) => (
            <SignUp {...props} changeLogging = {handleLogin} handleUser = {handleUser} user={user}/>
          )}/>
      </Router>
    )  
}

