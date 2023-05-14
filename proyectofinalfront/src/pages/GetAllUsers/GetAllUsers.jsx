import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../services/apiCalls";
import { userData } from "../userSlice";
import "./GetAllUsers.css";

export const GetAllUsers = () => {
  const reduxCredentials = useSelector(userData);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (userInfo.length === 0) {
      getAllUsers(reduxCredentials.credentials.token)
        .then((respuesta) => {
          setUserInfo(respuesta.data.data);
        })
        .catch((error) =>
          alert("Se produjo un error al cargar los clientes")
        );
    }
  }, [userInfo]);

  return (
    <div className="AppointmentsCards vh-100 table-container">
      <Container fluid>
        <Row className="justify-content-center">
          {userInfo.map((user) => (
            <Col key={user.id} xs={12} sm={6} md={4} lg={3} className="my-3">
              <Card>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};