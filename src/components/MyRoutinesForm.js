import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";





const MyRoutines = (props) => {
const [name, setName] = useState("");
const [ goal, setGoal ] = useState("");

const handleSubmit = (event) => {
    event.preventDefault();
    console.log('clicked')


  }


return (
    <div>
    <Form onSubmit={handleSubmit}>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" placeholder="Routine Name" />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Description</Form.Label>
    <Form.Control as="textarea" rows={4} type="text" placeholder="Routine Description" />
  </Form.Group>
</Form>
<Button 
type="submit"
   variant="outline-primary"
    size="sm"
    onClick={(event) => {
      handleSubmit(event)
      
     }}
      >Submit</Button>
   </div>
)
   



};




export default MyRoutines;