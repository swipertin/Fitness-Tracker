import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { hitAPI } from "../api";

const MyActivity = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { activity, setActivity } = props;

  const handleSubmit = (event) => {
    const newActivity = {
      name,
      description,
    };
    console.log(newActivity);
    hitAPI("POST", "/activities", newActivity)
      .then((response) => {
        const newActivity = response;
        setName("");
        setDescription("");
      })
      .catch(console.error);
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formActivities">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Activity Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            type="text"
            placeholder="Activity Description"
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <Button
        type="submit"
        variant="outline-primary"
        size="sm"
        onClick={(event) => {
          handleSubmit(event.target.value);
        }}
      >
        Submit
      </Button>
      
    </div>
  );
};

export default MyActivity;
