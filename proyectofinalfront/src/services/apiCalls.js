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

export const updateProfile = async (body, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return await axios.put(`${root}/user/getprofile/`, body, config);
};

export const getAllUsers = async (token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return await axios.get(`${root}/user/profile/getallusers`, config);
};

export const getAllVideogames = async (token, filters = {}) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const { genre, title, year, multiplayer, online, developer } = filters;
  let url = `${root}/user/getallvideogames?`;

  if (genre) {
    url += `&genre=${genre}`;
  }

  if (title) {
    url += `&title=${title}`;
  }

  if (year) {
    url += `&year=${year}`;
  }

  if (multiplayer) {
    url += `&multiplayer=${multiplayer}`;
  }

  if (online) {
    url += `&online=${online}`;
  }

  if (developer) {
    url += `&developer=${developer}`;
  }

  return await axios.get(url, config);
};

export const getVideogameById = async (token, id) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return await axios.get(`${root}/user/getvideogamebyid/${id}`, config);
};

export const addVideogame = async (body, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return await axios.post(`${root}/user/addvideogame`, body, config);
};

export const updateVideogame = async (body, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return await axios.put(`${root}/user/updatevideogame/`, body, config);
};

export const addToFavorite = async (body, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return await axios.post(`${root}/user/addtofavorite`, body, config);
};