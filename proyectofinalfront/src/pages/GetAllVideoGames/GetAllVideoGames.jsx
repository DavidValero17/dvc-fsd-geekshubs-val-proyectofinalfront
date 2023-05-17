import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { getAllVideogames } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { debounce } from "lodash";

export const GetAllVideogames = () => {
  const userState = useSelector(userData);
  const [videogameInfo, setVideogameInfo] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
    const debouncedVideogames = debounce((token, filters) => {
      getAllVideogames(token, filters)
        .then((respuesta) => {
          setVideogameInfo(respuesta.data.data);
        })
        .catch((error) => {
          alert("Se produjo un error al cargar los videojuegos");
        });
    }, 750);

    debouncedVideogames(userState.credentials.token, filters);
  }, [userState.credentials.token, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: checked }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="table-container">
      <button
        onClick={toggleFilters}
        style={{
          border: "none",
          padding: "10px 20px",
          borderRadius: "4px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
          marginBottom: "10px",
        }}
      >
        Filtros
      </button>
      {showFilters && (
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Título:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Título..."
              name="title"
              value={filters?.title ?? ""}
              onChange={handleFilterChange}
            />
          </Form.Group>

          <Form.Group controlId="formGenre">
            <Form.Label>Género:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Género..."
              name="genre"
              value={filters?.genre ?? ""}
              onChange={handleFilterChange}
            />
          </Form.Group>

          <Form.Group controlId="formYear">
            <Form.Label>Año:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Año..."
              name="year"
              value={filters?.year ?? ""}
              onChange={handleFilterChange}
            />
          </Form.Group>

          <Form.Group controlId="formMultiplayer">
            <Form.Check
              type="checkbox"
              name="multiplayer"
              label="Multiplayer"
              checked={filters.multiplayer ?? false}
              onChange={handleCheckboxChange}
            />
          </Form.Group>

          <Form.Group controlId="formOnline">
            <Form.Check
              type="checkbox"
              name="online"
              label="Online"
              checked={filters.online ?? false}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
        </Form>
      )}
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
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
              <td>
                <Link to={`/videogamedetail/${videogame.id}`}>
                  {videogame.title}
                </Link>
              </td>
              <td>{videogame.genre}</td>
              <td>{videogame.year}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
