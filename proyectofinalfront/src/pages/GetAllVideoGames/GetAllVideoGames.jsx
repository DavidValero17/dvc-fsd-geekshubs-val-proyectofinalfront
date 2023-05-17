import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { getAllVideogames } from "../../services/apiCalls";
import { userData } from "../userSlice";

export const GetAllVideogames = () => {
  const userState = useSelector(userData);
  const [videogameInfo, setVideogameInfo] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getAllVideogames(userState.credentials.token, filters)
      .then((respuesta) => {
        setVideogameInfo(respuesta.data.data);
      })
      .catch((error) => {
        alert("Se produjo un error al cargar los videojuegos");
      });
  }, [userState.credentials.token,filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters({ ...filters, [name]: checked });
  };

  return (
    <div className="table-container">
      <input
        placeholder="Título..."
        name="title"
        value={filters?.title ?? ""}
        onChange={handleFilterChange}
      />
      <input
        placeholder="Género..."
        name="genre"
        value={filters?.genre ?? ""}
        onChange={handleFilterChange}
      />
      <input
        placeholder="Año..."
        name="year"
        value={filters?.year ?? ""}
        onChange={handleFilterChange}
      />
      <input
        type="checkbox"
        name="multiplayer"
        checked={filters.multiplayer ?? false}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="multiplayer">Multiplayer</label>
      <br />
      <input
        type="checkbox"
        name="online"
        checked={filters.online ?? false}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="online">Online</label>
      <br />
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
              <td>
                <img
                  style={{ height: "50px" }}
                  src={videogame.image}
                  alt={videogame.description}
                />
              </td>
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
