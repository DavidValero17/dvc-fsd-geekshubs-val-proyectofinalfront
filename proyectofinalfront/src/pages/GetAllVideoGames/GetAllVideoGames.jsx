import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { getAllVideogames } from "../../services/apiCalls";
import { userData } from "../userSlice";


export const GetAllVideogames = () => {
  const userState = useSelector(userData);
  const [videogameInfo, setVideogameInfo] = useState([]);

  useEffect(() => {
    getAllVideogames(userState.credentials.token)
      .then((respuesta) => {
        setVideogameInfo(respuesta.data.data);
      })
      .catch((error) => {
        alert("Se produjo un error al cargar los videojuegos");
      });
  }, [userState.credentials.token]);

  return (
    <div className="table-container">
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Genre</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {videogameInfo.map((videogame) => (
            <tr key={videogame.id}>
              <td><img style={{height:"50px"}} src={videogame.image} alt={videogame.description}/></td>
              <td>{videogame.title}</td>
              <td>{videogame.description}</td>
              <td>{videogame.genre}</td>
              <td>{videogame.year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};