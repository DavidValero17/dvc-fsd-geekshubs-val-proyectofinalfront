import { useState, useEffect } from "react";

import "../../App.css";


import Container from "react-bootstrap/Container";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { InputRegister } from "../../common/RegisterForm/RegisterForm"
import { registerMe } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";



export const Register = () => {
  const navigate = useNavigate();


  const [credenciales, setCredenciales] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [welcome, setWelcome] = useState("");


  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const checkError = (e) => {
    e.preventDefault();
  };

  const registrame = () => {
    registerMe(credenciales)
        //Una vez nos hemos registrado...mostramos mensaje...
        setWelcome(`Gracias por registrarte.`);

        //Redirección a Home

        setTimeout(() => {
          navigate("/login");
        }, 1000);
  };
  return (
    <>
      <Container fluid className="CenteredForm">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
            <Form.Label column sm={2}>
              UserN.
            </Form.Label>
            <Col sm={10}>
              <InputRegister
                type="text"
                name="username"
                placeholder="Username"
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <InputRegister
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
              <InputRegister
                type="password"
                name="password"
                placeholder="Password"
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button onClick={() => registrame()}>Register Me</Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};
