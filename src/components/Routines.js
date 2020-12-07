import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { hitAPI, editRoutine } from "../api";
import Title from "./Title";

const Routines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isEdited, setIsEdited] = useState(false);

  const { routines, setRoutines, user } = props;
  console.log(routines);
  const [routineEdit, setRoutineEdit] = useState(null);

  const updateRoutine = (oldRoutine, newRoutine) => {
    const index = routines.indexOf(oldRoutine);
    routines[index] = newRoutine;
    routineEdit([...routines]);
    setRoutineEdit(null);

    hitAPI(`api/routine_activities/:routineActivityId `,  {
      method: "PATCH",
      body: JSON.stringify({
        count: '',
        duration: ''
      })
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      })
      .catch(console.error);
  };

  const deleteRoutine = (deletedId) => {
    console.log(deletedId);
    hitAPI("DELETE", `/routines/${deletedId}`)
      .then((response) => {
        console.log(response);

        const filteredRoutine = routines.filter((element) => {
          if (element.id === deletedId) {
            return false;
          } else {
            return true;
          }
        });
        console.log(filteredRoutine);
        setRoutines(filteredRoutine);
      })
      .catch(console.error);
  };
  const handleEdit = (id) => {
    const editRoutine = {
      name,
      goal,
    };

    hitAPI("PATCH", `/activities/${id}`, editRoutine)
      .then((response) => {
        const editRoutine = response.routine;
        setName("");
        setGoal("");
      })
      .catch(console.error);
  };

  return (
    <div>
      {routines.map((routine, idx) => {
        return (
          <Card key={idx} style={{ width: "18rem", margin: "15px" }}>
            <Card.Header>{routine.name}</Card.Header>
          { user === routine.creatorName ? <Button        
              type="submit"
              variant="outline-primary"
              size="sm"
              onClick={(event) => {
                deleteRoutine(routine.id);
              }}
            >
              Delete
            </Button> : null}
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                Created by: {routine.creatorName}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                Goal: {routine.goal}
              </Card.Subtitle>
              <Card.Title>Activities</Card.Title>
              {routine.activities
                ? routine.activities.map((activity, idxn) => {
                    return (
                      <ListGroup variant="flush" key={idxn}>
                        <ListGroup.Item>
                          <div>
                            <strong>
                              <span>Name: {activity.name}</span>
                            </strong>{" "}
                            <br />
                            <span>Count: {activity.count}</span> <br />
                            <span>Duration: {activity.duration}</span> <br />
                            <span>Description: {activity.description}</span>
                          </div>
                        </ListGroup.Item>
                        { user === routine.creatorName ? <Button
                          type="submit"
                          variant="outline-primary"
                          size="sm"
                          onClick={(event) => {
                            handleEdit(event.target.value);
                            <ListGroup.Item>
                              <span>Count: {activity.count}</span>
                              <span>Count: {activity.duration}</span>
                            </ListGroup.Item>
                          }}
                          
                        >
                          Edit
                        </Button> : null}
                      </ListGroup>
                    );
                  })
                : null}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Routines;
