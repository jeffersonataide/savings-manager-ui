import axios, { AxiosHeaders } from "axios";
import { useUserStore } from "@/store/userStore";

interface Headers extends AxiosHeaders {
  Authorization: string;
}

const API_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const jwt = useUserStore.getState().jwt;

  if (jwt) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt}`,
    } as Headers;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      useUserStore.getState().handleLogout();
    } else {
      throw error;
    }
  }
);

export { api };
