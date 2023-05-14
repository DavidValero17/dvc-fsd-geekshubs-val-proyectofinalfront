import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../services/apiCalls";
import { userData } from "../userSlice";
import "./GetAllUsers.css";

export const GetAllUsers = () => {
  const reduxCredentials = useSelector(userData);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    if (userInfo.length === 0) {
      getAllUsers(reduxCredentials.credentials.token)
        .then((respuesta) => {
          setUserInfo(respuesta.data.data);
        })
        .catch((error) =>
          alert("Se produjo un error al cargar los clientes")
        );
    }
  }, [userInfo]);

  return (
    <div className="AppointmentsCards vh-100 table-container">
      <Table responsive bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userInfo.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};