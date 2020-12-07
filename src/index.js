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



import { getToken, clearToken, hitAPI, RoutinesList } from "./api";

import { Activities, Login, Title, Routines, MyRoutineForm, MyActivityForm } from "./components";
import "./styles.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getToken());
const [user, setUser] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    RoutinesList
       .then((data) => {
         setRoutines(data);
       })
       .catch(console.error);
   }, [routines]);

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
          <Routines user={user} routines={routines} setRoutines={setRoutines} />
        </Route>
        <Route path="/activities">
          <Activities user={user} activities={activities} setActivities={setActivities} />
        </Route>
        <Route path="/my-routines">
          <MyRoutineForm user={user} setRoutines={setRoutines} routines={routines} activities={activities}/>
        </Route>
        <Route path="/my-activities">
          <MyActivityForm user={user} activities={activities} setActivities={setActivities}/>
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
