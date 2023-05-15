import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { userData, userout } from "../../pages/userSlice";
import "./header.css";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const datosCredencialesRedux = useSelector(userData);

  const logout = () => {
    dispatch(userout({ credentials: {}, token: "" }));
    navigate("/");
  };

  return (
    <Navbar bg="custom" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          GameFinder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {datosCredencialesRedux.credentials?.token &&
            datosCredencialesRedux.credentials.usuario.role_id === 1 ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Perfil
                </Nav.Link>
                <Nav.Link as={Link} to="/getallusers">
                  Usuarios
                </Nav.Link>
                <Nav.Link as={Link} to="/getallvideogames">
                  Videojuegos
                </Nav.Link>
                <Nav.Link as={Link} to="/addvideogame">
                  Añadir juego
                </Nav.Link>
                <Nav.Link as={Link} to="/updatevideogame">
                  Actualizar juego
                </Nav.Link>
              </>
            ) : datosCredencialesRedux.credentials?.token &&
              datosCredencialesRedux.credentials.usuario.role_id === 2 ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  Perfil
                </Nav.Link>
                <Nav.Link as={Link} to="/getallvideogames">
                  Videojuegos
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Registro
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
          {datosCredencialesRedux.credentials?.token && (
            <Nav className="ml-auto">
              <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};