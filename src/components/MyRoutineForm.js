import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { hitAPI } from "../api";

const MyRoutine = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
const { routines, setRoutines } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRoutine = {
      name,
      goal,
    };
    console.log("clicked");

    hitAPI("POST", "/routines", newRoutine)
      .then((response) => {
        console.log(response);
        const routineCopy = routines.slice();
        routineCopy.push(response);
        console.log(routineCopy, "TEST")
        setRoutines(routineCopy);

        setName("");
        setGoal("");
        console.log(routines)
      })
      .catch(console.error);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Routine Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            type="text"
            placeholder="Routine Goal"
            onChange={(event) => {
              setGoal(event.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <Button
        type="submit"
        variant="outline-primary"
        size="sm"
        onClick={(event) => {
          handleSubmit(event);
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default MyRoutine;
