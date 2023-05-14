import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import { getProfile } from "../../services/apiCalls";
import { userData } from "../userSlice";

export const Profile = () => {
  const reduxCredentials = useSelector(userData);
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
  });
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (reduxCredentials?.credentials?.token && !userProfile.username) {
      getProfile(reduxCredentials.credentials.token)
        .then((respuesta) => {
          setUserProfile({
            username: respuesta.data.data.username,
            email: respuesta.data.data.email,
          });
          setProfileImage(respuesta.data.data.profile_image);
        })
        .catch((error) => alert("Se produjo un error al cargar tu perfil"));
    }
  }, [reduxCredentials, userProfile]);

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: "80vh", width: "80vw" }}>
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
        </Card.Body>
      </Card>
    </Container>
  );
};