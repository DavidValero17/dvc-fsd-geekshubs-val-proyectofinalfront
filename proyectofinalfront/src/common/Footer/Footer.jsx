import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css"

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col>
            <p>Derechos de autor © 2021 Mi sitio web</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};