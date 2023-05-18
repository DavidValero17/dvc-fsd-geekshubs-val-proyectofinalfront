import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import {
  getProfile,
  updateProfile,
  deleteFavorite,
} from "../../services/apiCalls";
import { userData } from "../userSlice";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";

export const Profile = () => {
  const reduxCredentials = useSelector(userData);
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    favorites: [],
  });
  const [profileImage, setProfileImage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (reduxCredentials?.credentials?.token && !userProfile.username) {
      getProfile(reduxCredentials.credentials.token)
        .then((response) => {
          const { username, email, profile_image, favorites } =
            response.data.data;
          setUserProfile({ username, email, favorites });
          setProfileImage(profile_image);
        })
        .catch((error) => alert("Se produjo un error al cargar tu perfil"));
    }
  }, [reduxCredentials, userProfile]);

  const handleUpdateProfile = () => {
    const updatedProfile = {
      username: newUsername,
      user_id: reduxCredentials.credentials.usuario.user_id,
    };

    updateProfile(updatedProfile, reduxCredentials.credentials.token)
      .then((response) => {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          username: newUsername,
        }));
        setUpdateSuccess(true);
      })
      .catch((error) => {
        console.error("Error al actualizar el perfil:", error);
        alert("Se produjo un error al actualizar tu perfil");
      });
  };

  useEffect(() => {
    if (updateSuccess) {
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [updateSuccess]);

  const handleDeleteFavorite = (videogame_id) => {
    const body = {
      videogame_id: videogame_id,
    };

    deleteFavorite(body, reduxCredentials.credentials.token)
      .then((response) => {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          favorites: prevProfile.favorites.filter(
            (favorite) => favorite.videogame_id !== videogame_id
          ),
        }));
      })
      .catch((error) => {
        console.error("Error al eliminar el videojuego de favoritos:", error);
        alert("Se produjo un error al eliminar el videojuego de favoritos");
      });
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Card className="ProfileCard shadow-lg w-75">
        <div className="d-flex justify-content-center mt-4">
          <Image
            src={
              profileImage ||
              "https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
            }
            alt="profile image"
            className="ProfileImage"
            roundedCircle
            width={100}
            height={100}
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title className="ProfileTitle mt-3">
            {userProfile.username}
          </Card.Title>
          <Card.Text className="ProfileEmail mb-4">
            {userProfile.email}
          </Card.Text>
          {showUpdateForm ? (
            <>
              <input
                type="text"
                placeholder="Nuevo nombre de usuario"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="form-control mb-3"
              />
              <button onClick={handleUpdateProfile} className="btn btn-primary">
                Update profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowUpdateForm(true)}
                className="btn btn-primary mb-3"
              >
                Update your username
              </button>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Genre</th>
                    <th>Year</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userProfile.favorites.map((favorite) => (
                    <tr key={favorite.id}>
                      <td>
                        <img
                          style={{ height: "50px" }}
                          src={favorite.Videogame.image}
                          alt={favorite.Videogame.description}
                        />
                      </td>
                      <td>{favorite.Videogame.title}</td>
                      <td>{favorite.Videogame.description}</td>
                      <td>{favorite.Videogame.genre}</td>
                      <td>{favorite.Videogame.year}</td>
                      <td>
                        <button
                          onClick={() =>
                            handleDeleteFavorite(favorite.videogame_id)
                          }
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {updateSuccess && (
            <Alert
              variant="success"
              onClose={() => setUpdateSuccess(false)}
              dismissible
            >
              ¡Profile updated succesfully!
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
