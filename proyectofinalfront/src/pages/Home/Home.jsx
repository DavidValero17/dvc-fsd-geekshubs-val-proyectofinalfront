import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./Home.css"

export const Home = () => {
  return (
    <div className="HomePage">
      <Container fluid className="p-0">
        <Row className="m-0">
          <Col className="p-0">
            <div className="d-flex justify-content-center align-items-center vh-100">
              <div className="text-center">
                <h1>Bienvenido a nuestra página web</h1>
                <p>Te recomendamos los mejores juegos</p>
                <button className="btn btn-primary">Ver juegos</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
