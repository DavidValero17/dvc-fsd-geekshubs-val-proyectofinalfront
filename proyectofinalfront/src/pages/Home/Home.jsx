import React from "react";
import { Container, Row, Col, Button, Nav } from "react-bootstrap";

import "./Home.css";

export const Home = () => {
  const images = [
    "https://store-images.s-microsoft.com/image/apps.6937.14482474285447263.b2785fbb-9099-42c3-b705-629a79ac7e4a.1b3fdd25-f787-4146-8551-d00ad4d5be21",
    "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2022/09/legend-zelda-tears-kingdom-ficha-2813167.jpg?itok=kS5TDFcy",
    "https://cdn-products.eneba.com/resized-products/H73iUmTuTgMAMo5OotgUjD-9a7lJdVgpN6xfw6Mqov0_350x200_2x-0.jpg",
  ];

  return (
    <div className="HomePage">
      <Container fluid className="p-0">
        <Row className="m-0">
          <Col xs={12} md={6} lg={4} className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
              <h1>Bienvenido a nuestra página web</h1>
              <p>Te recomendamos los mejores juegos</p>
              <Nav.Link href="/getallvideogames">
                <Button variant="primary">Ver juegos</Button>
              </Nav.Link>
            </div>
          </Col>
          <Col xs={12} md={6} lg={8} className="d-flex align-items-center">
            <Row>
              {images.map((imageUrl, index) => (
                <Col key={index} xs={4} className="d-none d-md-block">
                  <img src={imageUrl} alt={`Imagen ${index}`} className="img-fluid" />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};