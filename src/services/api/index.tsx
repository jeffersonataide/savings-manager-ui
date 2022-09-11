import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getJWT = () => {
  return localStorage.getItem("jwt");
};

let jwt = getJWT();

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  jwt = getJWT();
  if (jwt) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt}`,
    };
  }
  return config;
});

export { api };
