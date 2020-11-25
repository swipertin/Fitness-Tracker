import React, { useState } from "react";
import ReactDom from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useParams,
} from "react-router-dom";

import { auth } from "../api";
import Title from "./Title";

const Main = (props) => {
  const { setIsLoggedIn } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      {errorMessage ? <h5 className="error">{errorMessage}</h5> : null}
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="username"
      />
      <button
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
      </button>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
      />

      <button
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
      </button>
    </form>
  );
};

const NavButtons = () => {
  return (
    <>
    <Title />
      <Link to="/home">Home</Link>
      <Link to="/workout">
        Work Out
      </Link>
      <Link to="/">
        
      </Link>
    </>
  );
};


export default Main;