import React, { useState, useEffect } from "react";
import { ActivitiesList, hitAPI } from "../api";
import { Card, Button } from "react-bootstrap";


const Activities = (props) => {
  const {activities, setActivities} = props;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [  ] = useState("");
  // const [  ] = useState("");

  useEffect(() => {
    ActivitiesList.then((data) => {
      setActivities(data);
    }).catch(console.error);
  }, []);

  const handleEdit = (id) => {
    const editActivity = {
      name,
      description,
    };

    hitAPI("PATCH", `/activities/${id}`, editActivity)
    .then((response) => {
      const editActivity = response;
      setName("");
      setDescription("");
    })
    .catch(console.error)
  };

  return (
    <div>
      {activities.map((activity, idx) => {
        return (
          <Card key={idx} style={{ width: "18rem", margin: "15px" }}>
            <Card.Body>
              <Card.Title>{activity.name}</Card.Title>
              {activity.description}
            </Card.Body>
            <Button
              type="submit"
              variant="outline-primary"
              size="sm"
              onClick={() => {
                handleEdit(activity.Id);
              }}
            >
              Update
            </Button>
            {/* <Button
        type="submit"
        variant="outline-primary"
        size="sm"
        onClick={(event) => {
          handleCancel(event.target.value);
        }}
      >
        Cancel
      </Button> */}
          </Card>
        );
      })}
    </div>
  );
};
export default Activities;
