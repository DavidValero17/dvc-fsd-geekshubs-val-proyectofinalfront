import axios from "axios";

const root = "http://localhost:4000";

export const logMe = async (body) => {
  return await axios.post(`${root}/auth/login`, body);
};

export const registerMe = async (body) => {
  return await axios.post(`${root}/auth/register`, body);
};
