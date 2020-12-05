import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { MyActivityForm } from ".";
import { hitAPI } from "../api";

const MyActivity = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { activity, setActivities } = props;

  const handleSubmit = (event) => {
    const newActivity = {
      name,
      description,
    };
    
    hitAPI("POST", "/activities", newActivity)
      .then((response) => {
        setActivities(response);
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
