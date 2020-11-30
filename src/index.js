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

// NOTE!! Install React Router (terminal --> npm install react-router-dom) if you haven't already.

import { getToken, clearToken, hitAPI } from "./api";

import { Activities, Login, Title, Routines, MyRoutines, MyActivities } from "./components";
import "./styles.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());

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
        <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      )}
      {/* <Main setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/> */}
      <Switch>
        <Route path="/routines">
          <Routines />
        </Route>
        <Route path="/activities">
          <Activities />
        </Route>
        <Route path="/my-routines">
          <MyRoutines />
        </Route>
        <Route path="/my-activities">
          <MyActivities />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
