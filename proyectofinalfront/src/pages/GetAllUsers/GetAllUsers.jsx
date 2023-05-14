import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { getAllUsers } from "../../services/apiCalls";
import { userData } from "../userSlice";

export const GetAllUsers = () => {
  const reduxCredentials = useSelector(userData);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (userInfo.length === 0) {
      getAllUsers(reduxCredentials.credentials.token)
        .then((respuesta) => {
          setUserInfo(respuesta.data.data);
        })
        .catch((error) => alert("Se produjo un error al cargar los clientes"));
    }
  }, [userInfo]);

  return (
    <div className="AppointmentsCards vh-100">
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Usuario</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userInfo.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
