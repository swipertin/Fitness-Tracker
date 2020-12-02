import React, { useState } from "react";
import { Button, Form, Nav, Navbar, Container } from "react-bootstrap";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { Activities } from ".";

import { auth } from "../api";
import Routines from "./Routines";
import Title from "./Title";

const Login = (props) => {
  const { isLoggedIn, setIsLoggedIn, setUser } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <div>
      {isLoggedIn ? (
        ((<Routines username={username} />),
        (<Activities username={username} />))
      ) : (
        <Container>
          <div>
            <Title />
            <div className="loginForm">
              <form onSubmit={(event) => event.preventDefault()}>
                {errorMessage ? (
                  <h5 className="error">{errorMessage}</h5>
                ) : null}
                <Form.Group controlId="formUserName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    size="sm"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setUser(event.target.value);
                    }}
                  />

                  <br />
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    size="sm"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={async (event) => {
                    try {
                      const result = await auth(username, password, true);
                      setIsLoggedIn(true);
                    } catch (error) {
                      setErrorMessage(error.message);
                    }
                  }}
                >
                  Register
                </Button>

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={async (event) => {
                    try {
                      const result = await auth(username, password);
                      setIsLoggedIn(true);
                    } catch (error) {
                      setErrorMessage(error.message);
                    }
                  }}
                >
                  Log In
                </Button>
              </form>
            </div>
            <Navbar bg="light" sticky="bottom">
              <Nav.Link href="/routines">Routines</Nav.Link>
              <Nav.Link href="/activities">Activities</Nav.Link>
            </Navbar>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Login;
