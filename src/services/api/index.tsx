import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getJWT = () => {
  return localStorage.getItem("jwt");
};

const jwt = getJWT();

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: jwt ? `Bearer ${jwt}` : "",
  },
});
