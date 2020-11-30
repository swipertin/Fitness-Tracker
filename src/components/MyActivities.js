import React, { useState } from "react";
import Activities from "./Activities";
import { Button, Form } from "react-bootstrap";
import data from "./Mockdata/RoutinesData";



const MyActivities = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('clicked')
    
    
      }

    return (
        <div>
             <Form onSubmit={handleSubmit}>
           <Form.Group controlId="formGroupEmail">
             <Form.Label>Name</Form.Label>
             <Form.Control type="text" placeholder="Activity Name" />
           </Form.Group>
           <Form.Group controlId="formGroupPassword">
             <Form.Label>Description</Form.Label>
             <Form.Control as="textarea" rows={4} type="text" placeholder="Activity Description" />
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
}






export default MyActivities;