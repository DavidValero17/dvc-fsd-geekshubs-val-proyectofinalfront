import React, { useEffect, useState } from 'react';
import { Card, Button, Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { getVideogameById, addToFavorite } from '../../services/apiCalls';
import { useParams } from 'react-router-dom';

import './VideogameDetail.css';

export const VideogameDetail = () => {
  const { id } = useParams();
  const userState = useSelector(userData);
  const [videogameInfo, setVideogameInfo] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const detailedVideogame = () => {
    getVideogameById(userState.credentials.token, id)
      .then((respuesta) => {
        setVideogameInfo(respuesta.data.data);
        setIsFavorite(respuesta.data.data.isFavorite); 
      })
      .catch((error) => {
        setShowToast(false);
      });
  };

  const AddToFavorites = () => {
    addToFavorite({ videogame_id: id }, userState.credentials.token)
      .then((response) => {
        setIsFavorite(true);
        setShowToast(true);
      })
      .catch((error) => {
        setShowToast(false);
      });
  };

  useEffect(() => {
    detailedVideogame(userState.credentials.token);
  }, [userState.credentials.token, id]);

  if (!videogameInfo) {
    return <div>Loading...</div>;
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
            <Button variant="primary" onClick={AddToFavorites}>
              Add to Favorites
            </Button>
          )}
        </Card.Body>
      </Card>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className={`toast ${isFavorite ? 'success' : 'error'}`}
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">{isFavorite ? 'Success' : 'Error'}</strong>
        </Toast.Header>
        <Toast.Body>
          {isFavorite ? 'Videogame added to favorites' : 'An error occurred while adding the videogame to favorites'}
        </Toast.Body>
      </Toast>
    </div>
  );
};