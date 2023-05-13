import React from "react";

import { useState, useEffect } from "react";
import { logMe } from "../../services/apiCalls";

import { useDispatch, useSelector } from "react-redux";

import { login, userData } from "../userSlice";

import { useNavigate } from "react-router-dom";
import { InputLogin } from "../../common/LoginForm/LoginForm";

import { decodeToken } from "react-jwt";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export const Login = () => {
  const navigate = useNavigate();

  //Instancio Redux en modo escritura y lectura

  const dispatch = useDispatch();
  const credentialsRdx = useSelector(userData);
  

  const [credenciales, setCredenciales] = useState({
    email: "",
    password: "",
  });

  const [welcome, setWelcome] = useState("");

  useEffect(() => {
    if (credentialsRdx.credentials?.token) {
      //Si No token...home redirect
      navigate("/");
    }
  }, []);

  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  };

  const checkError = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (credentialsRdx.credentials?.token) {
      //Si No token...home redirect
      navigate("/");
    }
  }, []);

  const logeame = () => {
    logMe(credenciales)
      .then((respuesta) => {
        let decoded = decodeToken(respuesta.data.data);

        let datosBackend = {
          token: respuesta.data.data,
          usuario: decoded,
        };

        //Este es el momento en el que guardo en REDUX
        dispatch(login({ credentials: datosBackend }));

        //Una vez nos hemos logeado...mostramos mensaje de bienvenida...
        setWelcome(`Bienvenid@ ${datosBackend.usuario.username}`);

        //Redirección a Home

        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => alert("Se produjo un error al realizar el login"));
  };

  return (
    <div className="loginDesign">
      {welcome !== "" ? (
        <div>{welcome}</div>
      ) : (
        <Container fluid className="CenteredForm">
          <Form>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <InputLogin
                  type="text"
                  name="email"
                  placeholder="email@email.com"
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalPassword"
            >
              <Form.Label column sm={2}>
                Pass
              </Form.Label>
              <Col sm={10}>
                <InputLogin
                  type="password"
                  name="password"
                  placeholder="password"
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCheck"
            >
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button onClick={() => logeame()}>Log Me</Button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      )}
    </div>
  );
};
