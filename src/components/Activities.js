import React, { useState, useEffect } from "react";
import { hitAPI } from "../api";
import { Card } from "react-bootstrap";
import data from "./Mockdata/ActivitiesData";

const Activities = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // const [  ] = useState("");
  // const [  ] = useState("");

  // useEffect(() => {
  //   hitAPI("GET", "/users/me")
  //     .then((data) => {
  //       const { posts } = data;
  //       // console.log(posts);

  //     })
  //     .catch(console.error);
  // }, []);

  return (
    <div>
      {data.map((activity, idx) => {
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
