import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

export const Header = () => {
    return (
        <Navbar style={{ backgroundColor: "#2626264a" }} expand="lg">
          <Container>
            <Navbar.Brand href="/">Mi Página Web</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Inicio</Nav.Link>
                <Nav.Link href="#">Juegos</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/login">Iniciar sesión</Nav.Link>
                <Nav.Link href="/register">Registrarse</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    };