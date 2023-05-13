import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import { useSelector } from "react-redux";
import { getProfile } from "../../services/apiCalls";
import { userData } from "../userSlice";

export const Profile = () => {
  const reduxCredentials = useSelector(userData);
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (reduxCredentials?.credentials?.token && !userProfile.username) {
      getProfile(reduxCredentials.credentials.token)
        .then((respuesta) => {
          setUserProfile({
            username: respuesta.data.data.username,
            email: respuesta.data.data.email,
          });
          console.log(respuesta)
        })
        .catch((error) => alert("Se produjo un error al cargar tu perfil"));
    }
  }, [reduxCredentials, userProfile]);

  return (
    <Container fluid className="CenteredForm">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{userProfile.username}</Card.Title>
          <Card.Text>
            <li>{userProfile.email}</li>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};