import React, { useState } from "react";
import { addVideogame } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Container, Form, Button } from "react-bootstrap";

export const AddVideogame = () => {
  const userState = useSelector(userData);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    genre: "",
    year: "",
    multiplayer: false,
    online: false,
    developer_id: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await addVideogame(
        formData,
        userState.credentials.token
      );
      setSuccessMessage("El videojuego ha sido añadido exitosamente.");
      setFormData({
        title: "",
        image: "",
        description: "",
        genre: "",
        year: "",
        multiplayer: false,
        online: false,
        developer_id: "",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error al añadir el videojuego:", error);
    }
  };

  return (
    <Container>
      <h1>Añadir Videojuego</h1>
      {successMessage && <p>{successMessage}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Imagen:</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Género:</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Año:</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="¿Tiene multijugador?"
            name="multiplayer"
            checked={formData.multiplayer}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="¿Es en línea?"
            name="online"
            checked={formData.online}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ID del desarrollador:</Form.Label>
          <Form.Control
            type="text"
            name="developer_id"
            value={formData.developer_id}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Añadir
        </Button>
      </Form>
    </Container>
  );
};
