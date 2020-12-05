import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import { hitAPI } from "../api";

const MyRoutine = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const { routines, setRoutines } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRoutine = {
      name,
      goal,
      isPublic,
    };
    console.log(newRoutine);
    hitAPI("POST", "/routines", newRoutine)
      .then((response) => {
        console.log(response, "in Post in MyRoutine");
        setRoutines(response);

        setName("");
        setGoal("");
        setIsPublic(true);
      })
      .catch(console.error);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formRoutine">
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
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Is Public:</Form.Label>
          <Form inline>
            <Form.Control
              as="select"
              custom
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Control>
          </Form>
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
