import axios from 'axios';

axios.defaults.withCredentials = true;

export const API = axios.create({
  baseURL: `http://localhost:3000/api/v1`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 60000,
});

export default API;
