import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../services/apiCalls";
import { userData } from "../userSlice";

export const GetAllUsers = () => {
    const reduxCredentials = useSelector(userData);
    const [userInfo, setUserInfo] = useState([]);
    console.log(reduxCredentials)
  
    useEffect(() => {
      if (userInfo.length === 0) {
        getAllUsers(reduxCredentials.credentials.token)
          .then((respuesta) => {
            setUserInfo(respuesta.data.data);
            console.log(respuesta)
          })
          .catch((error) => alert("Se produjo un error al cargar los clientes"));
      }
    }, [userInfo]);
    console.log(userInfo)
  
    return (
      <div className="AppointmentsCards d-flex justify-content-center align-items-center vh-100">
        <Container>
          <Row className="d-flex justify-content-center">
            {userInfo.map((user) => (
              <Col
                key={user.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="my-3"
              >
                <Card style={{ width: "18rem" }}>
                  <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>
                      <li>{user.email}</li>
                      {/* <li>{cliente.User.phone}</li>
                      <li>{cliente.User.email}</li> */}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  };
  