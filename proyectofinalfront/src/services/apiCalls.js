import axios from "axios";

const root = "http://localhost:4000";

export const logMe = async (body) => {
  return await axios.post(`${root}/auth/login`, body);
};

export const registerMe = async (body) => {
  return await axios.post(`${root}/auth/register`, body);
};

export const getProfile = async (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await axios.get(`${root}/user/getprofile`, config);
  };

export const getAllUsers = async (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await axios.get(`${root}/user/profile/getallusers`, config);
  };

  export const getAllVideogames = async (token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await axios.get(`${root}/user/getallvideogames`, config);
  };

  export const addVideogame = async (body, token) => {
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    return await axios.post(`${root}/user/addvideogame`, body, config);
};