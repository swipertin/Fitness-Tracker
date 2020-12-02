import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import Title from "./Title";
import { RoutinesList } from "../api";





const Routines = (props) => {
  
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    RoutinesList
       .then((data) => {
       
         setRoutines(data);
       })
       .catch(console.error);
   }, []);

  return (
  <div>
      {routines.map((routine, idx)=> {
return (
    
<Card key={idx} style={{ width: '18rem',
margin: '15px' }}>
    <Card.Header>{routine.name}</Card.Header>
  <Card.Body>
    <Card.Subtitle className="mb-2 text-muted">Created by: {routine.creatorName}
</Card.Subtitle>
    <Card.Subtitle className="mb-2 text-muted">Goal: {routine.goal}
</Card.Subtitle>
<Card.Title>Activities</Card.Title>
      {routine.activities.map((activity, idxn) => {
          return (
          <ListGroup variant="flush" key={idxn}>
        <ListGroup.Item><div><strong><span>Name: {activity.name}</span></strong> <br />
        <span>Duration: {activity.duration}</span> <br />
        <span>Count: {activity.count}</span> <br />
        <span>Description: {activity.description}</span>
        </div></ListGroup.Item>         
  </ListGroup>
          )
      })}
    
    
  </Card.Body>
</Card>
    
)
      })
      }
  </div>
  );
};

export default Routines;
