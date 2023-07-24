import axios from "axios";
import { updateToken } from "../util/updateToken";

const API = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 60000,
});

API.interceptors.request.use(async (config) => {
  // Asignar token a la cabecera de Authorization
  const token = await updateToken();
  config.headers.Authorization = `Bearer ${token}`;

  return config;
}, (error) => {
  return Promise.reject(error);
});

export { API };