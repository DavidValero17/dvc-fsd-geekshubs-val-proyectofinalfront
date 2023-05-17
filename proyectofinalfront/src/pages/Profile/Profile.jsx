import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../services/apiCalls";
import { userData } from "../userSlice";
import Alert from "react-bootstrap/Alert";

export const Profile = () => {
  const reduxCredentials = useSelector(userData);
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (reduxCredentials?.credentials?.token && !userProfile.username) {
      getProfile(reduxCredentials.credentials.token)
        .then((response) => {
          const { username, email, profile_image } = response.data.data;
          setUserProfile({ username, email });
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

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "80vh", width: "80vw" }}
    >
      <Card className="ProfileCard shadow-lg w-75">
        <div className="d-flex justify-content-center">
          <Image
            src={profileImage || "https://cdn-icons-png.flaticon.com/512/1077/1077063.png"}
            alt="profile image"
            className="ProfileImage mx-auto mt-4"
            roundedCircle
            width={150}
            height={150}
          />
        </div>
        <Card.Body className="text-center">
          <Card.Title className="ProfileTitle mt-3">{userProfile.username}</Card.Title>
          <Card.Text>
            <p className="ProfileEmail mb-4">{userProfile.email}</p>
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
                Actualizar perfil
              </button>
            </>
          ) : (
            <button onClick={() => setShowUpdateForm(true)} className="btn btn-primary">
              Actualizar tu Nombre de usuario
            </button>
          )}
          {updateSuccess && (
            <Alert variant="success" onClose={() => setUpdateSuccess(false)} dismissible>
              ¡Perfil actualizado exitosamente!
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};