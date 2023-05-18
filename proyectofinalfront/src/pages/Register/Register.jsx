import { useState } from "react";
import { registerMe } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { InputRegister } from "../../common/RegisterForm/RegisterForm";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

export const Register = () => {
  const navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registroExitoso, setRegistroExitoso] = useState(false);

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
      .then(() => {
        setRegistroExitoso(true);
        setTimeout(() => {
          navigate("/login", {});
        }, 3000);
      })
      .catch(() => alert("Se produjo un error al realizar el registro"));
  };

  return (
    <div className="loginDesign">
      <Container fluid className="CenteredForm">
        <Row
          className="justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Col xs={12} md={6} lg={4}>
            {registroExitoso ? (
              <h2>¡Gracias por registrarte!</h2>
            ) : (
              <Form>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalName"
                >
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

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formHorizontalEmail"
                >
                  <Form.Label column sm={2}>
                    Email
                  </Form.Label>
                  <Col sm={10}>
                    <InputRegister
                      type="text"
                      name="email"
                      placeholder="email@example.com"
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
                    <Button onClick={() => registrame()}>Registrame</Button>
                  </Col>
                </Form.Group>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
