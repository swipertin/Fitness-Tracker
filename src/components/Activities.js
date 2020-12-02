import React, { useState, useEffect } from "react";
import { ActivitiesList } from "../api";
import { Card } from "react-bootstrap";


const Activities = (props) => {
  const [id, setId] = useState("");
  const [activities, setActivities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [  ] = useState("");
  // const [  ] = useState("");

  useEffect(() => {
   ActivitiesList
      .then((data) => {
        setActivities(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      {activities.map((activity, idx) => {
        return (
          <Card key={idx} style={{ width: "18rem", margin: "15px" }}>
            <Card.Body>
              <Card.Title>{activity.name}</Card.Title>
          {activity.description}
            
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};
export default Activities;
