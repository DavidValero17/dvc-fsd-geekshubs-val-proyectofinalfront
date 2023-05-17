import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { getVideogameById } from "../../services/apiCalls";
import { useParams} from 'react-router-dom';

import "./VideogameDetail.css"

export const VideogameDetail = () => {
    const { id } = useParams();
    const userState = useSelector(userData);
    const [videogameInfo, setVideogameInfo] = useState([]);
  
    const detailedVideogame = () => {
      getVideogameById(userState.credentials.token, id)
        .then((respuesta) => {
          setVideogameInfo(respuesta.data.data);
        })
        .catch((error) => {
          alert("Se produjo un error al cargar los videojuegos");
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
        <hr />
        <Card.Text>Year: {videogameInfo.year}</Card.Text>
      </Card.Body>
    </Card>
  </div>
  );
};