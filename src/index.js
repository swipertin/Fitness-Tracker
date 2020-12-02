import React, { useEffect, useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



import { getToken, clearToken, hitAPI } from "./api";

import { Activities, Login, Title, Routines, MyRoutines, MyActivities } from "./components";
import "./styles.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
const [user, setUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      {isLoggedIn ? (
        <>
          <Navbar bg="light">
            <Navbar.Brand href="/home">DTQ15</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link>
                <Link to="/routines">Routines</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/activities">Activities</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/my-routines">My Routines</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/my-activities">My Activities</Link>
              </Nav.Link>
            </Nav>

            <Button
              variant="outline-secondary"
              size="sm"
              className="logOut"
              onClick={() => {
                clearToken();
                setIsLoggedIn(false);
              }}
            >
              Log Out
            </Button>
          </Navbar>
        </>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} setUser={setUser}/>
      )}
      
      <Switch>
        <Route path="/routines">
          <Routines user={user}/>
        </Route>
        <Route path="/activities">
          <Activities user={user}/>
        </Route>
        <Route path="/my-routines">
          <MyRoutines user={user}/>
        </Route>
        <Route path="/my-activities">
          <MyActivities user={user}/>
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
