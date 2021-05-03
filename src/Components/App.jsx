import React, { useState } from 'react'
import EventCalendar from './EventCalendar';
import Login from './Login'
import SignUp from './Signup'
import {
  BrowserRouter as Router,
  Route} from "react-router-dom";
// import axios from 'axios';

// axios.create({baseURL: "http://localhost:8081" // the url of our server
// })

function App() {
  const [logged, setLogged] = useState(false);

  function handleLogin(){
    setLogged(!logged)
  }

    return (
      <Router>
          {/* <Route exavt path="/" component={ToolBar}/> */}
          <Route exact path="/" render={(props) => (
            <EventCalendar {...props} logged={logged} />
          )}/>
          <Route exact path="/login" render={(props) => (
            <Login {...props} changeLogging = {handleLogin} />
          )}/>
          <Route exact path="/signup" component={SignUp}/>
      </Router>
    )  
}

export default App;
