import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getVideogameById, addToFavorite } from "../../services/apiCalls";
import { useParams} from 'react-router-dom';

import "./VideogameDetail.css"

export const VideogameDetail = () => {
  const { id } = useParams();
  const userState = useSelector(userData);
  const [videogameInfo, setVideogameInfo] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const detailedVideogame = () => {
    getVideogameById(userState.credentials.token, id)
      .then((respuesta) => {
        setVideogameInfo(respuesta.data.data);
        setIsFavorite(respuesta.data.data.isFavorite); // Agregamos esta línea para verificar si el videojuego ya está en favoritos
      })
      .catch((error) => {
        alert("Se produjo un error al cargar los videojuegos");
      });
  };

  const handleAddToFavorites = () => {
    addToFavorite({ videogame_id: id }, userState.credentials.token)
      .then((response) => {
        setIsFavorite(true);
        alert(response.data.message);
      })
      .catch((error) => {
        alert("Se produjo un error al añadir el videojuego a favoritos");
      });
  };

  useEffect(() => {
    detailedVideogame(userState.credentials.token);
  }, [userState.credentials.token, id]);

  if (!videogameInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="videogame-detail">
      <Card>
        <Card.Img variant="top" src={videogameInfo.image} alt={videogameInfo.description} />
        <hr />
        <Card.Body>
          <Card.Title>{videogameInfo.title}</Card.Title>
          <hr />
          <Card.Text>{videogameInfo.description}</Card.Text>
          <hr />
          <Card.Text>Genre: {videogameInfo.genre}</Card.Text>
          <Card.Text>Year: {videogameInfo.year}</Card.Text>
          {!isFavorite && (
            <Button variant="primary" onClick={handleAddToFavorites}>
              Add to Favorites
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};