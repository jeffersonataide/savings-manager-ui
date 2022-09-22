import axios from "axios";
import { getLocalJWT, removeLocalJWT } from "../../utils/localStorage";

const API_URL = process.env.REACT_APP_API_URL;

let jwt = getLocalJWT();

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  jwt = getLocalJWT();
  if (jwt) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt}`,
    };
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      removeLocalJWT();
    }
  }
);

export { api };
